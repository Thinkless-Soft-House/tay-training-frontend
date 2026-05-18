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

  /**
   * Gera variantes do slug adicionando/removendo zeros à esquerda
   * em cada segmento numérico entre hífens, sem repetir o original.
   * Ex: "13-mes-01-1-ano-5x" → ["13-mes-01-01-ano-5x"]
   *     "13-mes-01-01-ano"   → ["13-mes-01-1-ano"]
   */
  private slugVariants(slug: string): string[] {
    const variants = new Set<string>();
    // Adiciona zero em dígito isolado: -1- ou -1 no final → -01-
    variants.add(slug.replace(/(^|-)([0-9])(-|$)/g, '$10$2$3'));
    // Remove zero à esquerda: -01- → -1-
    variants.add(slug.replace(/(^|-)0([1-9])(-|$)/g, '$1$2$3'));
    variants.delete(slug);
    return Array.from(variants);
  }

  /** GET simples: retorna o body ou null se vazio. Lança em erro de rede. */
  private async tryFetch<T>(url: string): Promise<T | null> {
    const response = await this.http.get<T>(url, {
      headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate', 'Pragma': 'no-cache' },
      observe: 'response'
    }).toPromise();
    return response?.body ?? null;
  }

  async getPlannerHomeWithDebug(slug: string): Promise<PlannerHomeResponse> {
    const timestamp = Date.now();
    const slugsToTry = [slug, ...this.slugVariants(slug)];

    const debugInfo: PlannerHomeResponse['debug'] = {
      url: `${this.path}/planner-home/${slug}?_t=${timestamp}`,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      for (const candidate of slugsToTry) {
        const url = `${this.path}/planner-home/${candidate}?_t=${timestamp}`;
        const data = await this.tryFetch<any>(url);
        if (data) {
          debugInfo.url = url;
          debugInfo.status = 200;
          debugInfo.rawResponse = JSON.stringify(data);
          return { data, debug: debugInfo };
        }
      }

      debugInfo.errorType = 'empty';
      debugInfo.errorMessage = 'Resposta vazia do servidor';
      return { data: null, debug: debugInfo };

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
    const slugsToTry = [slug, ...this.slugVariants(slug)];

    const debugInfo: WeekDataResponse['debug'] = {
      url: `${this.path}/week/${slug}/${week}?_t=${timestamp}`,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      for (const candidate of slugsToTry) {
        const url = `${this.path}/week/${candidate}/${week}?_t=${timestamp}`;
        const data = await this.tryFetch<WeekData>(url);
        if (data && Array.isArray(data.weekDays) && data.weekDays.some(d => d !== null)) {
          debugInfo.url = url;
          debugInfo.status = 200;
          debugInfo.rawResponse = JSON.stringify(data);
          return { data, debug: debugInfo };
        }
      }

      // Nenhum candidato teve treinos — pode ser semana toda de folga real. Devolve o original.
      const fallbackUrl = `${this.path}/week/${slug}/${week}?_t=${timestamp}`;
      const fallback = await this.tryFetch<WeekData>(fallbackUrl);
      if (fallback && Array.isArray(fallback.weekDays)) {
        debugInfo.status = 200;
        debugInfo.rawResponse = JSON.stringify(fallback);
        return { data: fallback, debug: debugInfo };
      }

      debugInfo.errorType = 'empty';
      debugInfo.errorMessage = 'Resposta vazia do servidor';
      return { data: null, debug: debugInfo };

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
    const slugsToTry = [slug, ...this.slugVariants(slug)];
    const timestamp = Date.now();

    const debugInfo: WorkoutDetailResponse['debug'] = {
      url: `${this.path}/workout-detail/${slug}/${week}/${workout}?_t=${timestamp}`,
      timestamp,
      status: 0,
      statusText: '',
      rawResponse: '',
      errorType: null,
      userAgent: navigator.userAgent
    };

    try {
      for (const candidate of slugsToTry) {
        const url = `${this.path}/workout-detail/${candidate}/${week}/${workout}?_t=${timestamp}`;
        const data = await this.tryFetch<WorkoutDetail>(url);
        if (data) {
          debugInfo.url = url;
          debugInfo.status = 200;
          debugInfo.rawResponse = JSON.stringify(data);
          return { data, debug: debugInfo };
        }
      }

      debugInfo.errorType = 'empty';
      debugInfo.errorMessage = 'Resposta vazia do servidor';
      return { data: null, debug: debugInfo };

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
