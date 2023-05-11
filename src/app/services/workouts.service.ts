import { Injectable } from '@angular/core';
import { BaseModelService } from './base-model.service';
import { HttpClient } from '@angular/common/http';

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
}
