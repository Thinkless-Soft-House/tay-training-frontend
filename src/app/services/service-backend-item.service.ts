import { BaseModelService } from './base-model.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceBackendItemService extends BaseModelService {
  constructor(http: HttpClient) {
    super('/items', http);
  }
}
