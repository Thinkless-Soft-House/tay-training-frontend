import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseSetService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/exercise-groups', http);
  }
}
