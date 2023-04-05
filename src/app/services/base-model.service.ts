import { Observable, firstValueFrom, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class BaseModelService {
  path: string;
  constructor(subPath: string, public http: HttpClient) {
    this.path = `${environment.apiUrl}${subPath}`;
  }

  private async request(req: Observable<any>) {
    return firstValueFrom(req);
  }

  private mockupRequest() {
    return this.http
      .get('https://binaryjazz.us/wp-json/genrenator/v1/genre/10 ')
      .pipe(
        map((res: any) => {
          const ret = {
            items: res.map((item: any, index: number) => {
              return {
                id: index,
                name: item,
              };
            }),
            total: res.length,
          };

          return ret;
        })
      );
  }

  getAll() {
    const req = this.http.get(this.path);
    return this.request(req);
  }

  getByFilter(filter: { [key: string]: string }) {
    const filterQuery = Object.entries(filter).reduce(
      (acc, [key, value], index) => {
        return Object.entries(filter).length !== index + 1
          ? `${acc}${key}=${value}&`
          : `${acc}${key}=${value}`;
      },
      ''
    );
    const req = this.http.get(`${this.path}/filter?${filterQuery}`);
    // return this.request(req);
    return this.request(this.mockupRequest());
  }

  getById(id: number) {
    const req = this.http.get(`${this.path}/${id}`);
    return this.request(req);
  }

  create(item: any) {
    const req = this.http.post(this.path, item);
    return this.request(req);
  }

  update(item: any) {
    const req = this.http.put(`${this.path}/${item.id}`, item);
    return this.request(req);
  }

  delete(id: number) {
    const req = this.http.delete(`${this.path}/${id}`);
    return this.request(req);
  }
}
