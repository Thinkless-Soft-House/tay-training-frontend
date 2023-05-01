import { Injectable } from '@angular/core';
import { TrainingDay } from '../pages/workouts/workout-details/workout-details.component';
import { HttpClient } from '@angular/common/http';
import { BaseModelService } from './base-model.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingDayService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/training-day', http);
  }

  updateList(trainingDays: TrainingDay[]) {
    const req = this.http.patch(`${this.path}/update-list`, trainingDays);
    return this.request(req);
  }
}
