import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ExerciseMethodService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/exercise-method', http);
  }

  clearByExerciseGroupId(exerciseGroupId: number) {
    return this.request(
      this.http.post(`${this.path}/clear`, { exerciseGroupId })
    );
  }
}
