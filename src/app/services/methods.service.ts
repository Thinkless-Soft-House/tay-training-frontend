import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';

@Injectable({
  providedIn: 'root',
})
export class MethodsService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/methods', http);
  }
}
