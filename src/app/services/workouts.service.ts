import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';
import { HttpClient } from '@angular/common/http';

export interface WeekData {
  id: number;
  publicName: string;
  slug: string;
  weekDays: (TrainingDay | null)[];
}

export interface TrainingDay {
  id: number;
  day: number;
  shortName: string;
  exerciseGroup: {
    id: number;
    publicName: string;
    category: {
      id: number;
      name: string;
    };
  };
}

export interface WorkoutDetail {
  id: number;
  publicName: string;
  slug: string;
  workout: ExerciseGroup;
}

export interface ExerciseGroup {
  id: number;
  publicName: string;
  observations?: string;
  exerciseMethods: ExerciseMethod[];
}

export interface ExerciseMethod {
  id: number;
  rest: string;
  observations?: string;
  exerciseConfigurations: ExerciseConfiguration[];
}

export interface ExerciseConfiguration {
  id: number;
  series: number;
  reps: string;
  exercise: Exercise;
  method: Method;
}

export interface Exercise {
  id: number;
  name: string;
  videoUrl: string;
}

export interface Method {
  id: number;
  name: string;
}

// Resposta estendida para incluir metadados de debug
export interface WeekDataResponse {
  data: WeekData | null;
  debug: {
    url: string;
    timestamp: number;
    status: number;
    statusText: string;
    rawResponse: string;
    errorType?: 'network' | 'empty' | 'invalid' | null;
    errorMessage?: string;
    userAgent?: string;
  };
}

// Resposta estendida para incluir metadados de debug
export interface WorkoutDetailResponse {
  data: WorkoutDetail | null;
  debug: {
    url: string;
    timestamp: number;
    status: number;
    statusText: string;
    rawResponse: string;
    errorType?: 'network' | 'empty' | 'invalid' | null;
    errorMessage?: string;
    userAgent?: string;
  };
}

// Resposta estendida para incluir metadados de debug
export interface PlannerHomeResponse {
  data: any | null;
  debug: {
    url: string;
    timestamp: number;
    status: number;
    statusText: string;
    rawResponse: string;
    errorType?: 'network' | 'empty' | null;
    errorMessage?: string;
    userAgent?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutsService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/training-sheet', http);
  }

  getBySlug(slug: string, relations?: string[]) {
    const rel = relations ? relations.join(',') : '';
    const req = this.http.get(`${this.path}/slug/${slug}?relations=${rel}`);
    return this.request(req);
  }
  getFileById(id: number) {
    const req = this.http.get(`${this.path}/file/${id}`, {
      responseType: 'blob', // Especifica que o tipo de resposta será um blob (binário)
    });
    return this.request(req);
  }

  async getPlannerHomeWithDebug(slug: string): Promise<PlannerHomeResponse> {
    const timestamp = Date.now();
    const url = `${this.path}/planner-home/${slug}?_t=${timestamp}`;

    const debugInfo: PlannerHomeResponse['debug'] = {
      url,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      const response = await this.http.get<any>(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        observe: 'response'
      }).toPromise();

      debugInfo.status = response?.status || 0;
      debugInfo.statusText = response?.statusText || '';
      debugInfo.rawResponse = JSON.stringify(response?.body);

      const data = response?.body || null;

      if (!data) {
        debugInfo.errorType = 'empty';
        debugInfo.errorMessage = 'Resposta vazia do servidor';
        return { data: null, debug: debugInfo };
      }

      return { data, debug: debugInfo };

    } catch (error: any) {
      debugInfo.status = error?.status || 0;
      debugInfo.statusText = error?.statusText || error?.message || 'Erro desconhecido';
      debugInfo.rawResponse = JSON.stringify(error);
      debugInfo.errorType = 'network';
      debugInfo.errorMessage = error?.status === 0
        ? 'Não foi possível conectar ao servidor. Verifique sua conexão.'
        : `Erro ${error?.status}: ${error?.statusText || error?.message}`;

      return { data: null, debug: debugInfo };
    }
  }

  async getPlannerHome(slug: string) {
    const result = await this.getPlannerHomeWithDebug(slug);
    if (!result.data) {
      throw new Error(result.debug.errorMessage || 'Erro ao carregar o planner');
    }
    return result.data;
  }

  async getWeekDataWithDebug(slug: string, week: number): Promise<WeekDataResponse> {
    const timestamp = Date.now();
    const url = `${this.path}/week/${slug}/${week}?_t=${timestamp}`;

    const debugInfo: WeekDataResponse['debug'] = {
      url,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      const response = await this.http.get<WeekData>(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        observe: 'response'
      }).toPromise();

      debugInfo.status = response?.status || 0;
      debugInfo.statusText = response?.statusText || '';
      debugInfo.rawResponse = JSON.stringify(response?.body);

      const data = response?.body || null;

      // Verificar se resposta está vazia ou inválida
      if (!data) {
        debugInfo.errorType = 'empty';
        debugInfo.errorMessage = 'Resposta vazia do servidor';
        return { data: null, debug: debugInfo };
      }

      if (!data.weekDays || !Array.isArray(data.weekDays)) {
        debugInfo.errorType = 'invalid';
        debugInfo.errorMessage = 'Estrutura de dados inválida';
        return { data: null, debug: debugInfo };
      }

      return { data, debug: debugInfo };

    } catch (error: any) {
      debugInfo.status = error?.status || 0;
      debugInfo.statusText = error?.statusText || error?.message || 'Erro desconhecido';
      debugInfo.rawResponse = JSON.stringify({
        name: error?.name,
        message: error?.message,
        status: error?.status,
        error: error?.error
      });
      debugInfo.errorType = 'network';
      debugInfo.errorMessage = error?.status === 0
        ? 'Não foi possível conectar ao servidor. Verifique sua conexão.'
        : `Erro ${error?.status}: ${error?.statusText || error?.message}`;

      return { data: null, debug: debugInfo };
    }
  }

  // Método legado para compatibilidade
  async getWeekData(slug: string, week: number): Promise<WeekData> {
    const result = await this.getWeekDataWithDebug(slug, week);
    if (!result.data) {
      throw new Error(result.debug.errorMessage || 'Erro ao carregar dados');
    }
    return result.data;
  }

  async getWorkoutDetailWithDebug(
    slug: string,
    week: number,
    workout: number
  ): Promise<WorkoutDetailResponse> {
    const timestamp = Date.now();
    const url = `${this.path}/workout-detail/${slug}/${week}/${workout}?_t=${timestamp}`;

    const debugInfo: WorkoutDetailResponse['debug'] = {
      url,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      const response = await this.http.get<WorkoutDetail>(url, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        observe: 'response'
      }).toPromise();

      debugInfo.status = response?.status || 0;
      debugInfo.statusText = response?.statusText || '';
      debugInfo.rawResponse = JSON.stringify(response?.body);

      const data = response?.body || null;

      if (!data) {
        debugInfo.errorType = 'empty';
        debugInfo.errorMessage = 'Resposta vazia do servidor';
        return { data: null, debug: debugInfo };
      }

      return { data, debug: debugInfo };

    } catch (error: any) {
      debugInfo.status = error?.status || 0;
      debugInfo.statusText = error?.statusText || error?.message || 'Erro desconhecido';
      debugInfo.rawResponse = JSON.stringify({
        name: error?.name,
        message: error?.message,
        status: error?.status,
        error: error?.error
      });
      debugInfo.errorType = 'network';
      debugInfo.errorMessage = error?.status === 0
        ? 'Não foi possível conectar ao servidor. Verifique sua conexão.'
        : `Erro ${error?.status}: ${error?.statusText || error?.message}`;

      return { data: null, debug: debugInfo };
    }
  }

  async getWorkoutDetail(
    slug: string,
    week: number,
    workout: number
  ): Promise<WorkoutDetail> {
    const result = await this.getWorkoutDetailWithDebug(slug, week, workout);
    if (!result.data) {
      throw new Error(result.debug.errorMessage || 'Erro ao carregar detalhes do treino');
    }
    return result.data;
  }
}
