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

  async getPlannerHome(slug: string) {
    const req = this.http.get<any>(`${this.path}/planner-home/${slug}`);
    return await this.request(req);
  }
  async getWeekData(slug: string, week: number): Promise<WeekData> {
    const req = this.http.get<WeekData>(`${this.path}/week/${slug}/${week}`);
    return await this.request(req);
  }
  async getWorkoutDetail(
    slug: string,
    week: number,
    workout: number
  ): Promise<WorkoutDetail> {
    const req = this.http.get<WorkoutDetail>(
      `${this.path}/workout-detail/${slug}/${week}/${workout}`
    );
    return await this.request(req);
  }
}
