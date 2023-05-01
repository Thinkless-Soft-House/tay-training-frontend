import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';
import { ExerciseConfiguration } from '../pages/exercise-set/exercise-set-details/exercise-set-details.component';

@Injectable({
  providedIn: 'root',
})
export class ExerciseConfigurationService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/exercise-configurations', http);
  }

  updateListExerciseMethod(exerciseConfigurations: ExerciseConfiguration[]) {
    const req = this.http.patch(`${this.path}/update-list`, exerciseConfigurations);
    return this.request(req);
  }
}
