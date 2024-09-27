import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = environment.apiUrl;

  constructor(public http: HttpClient, private router: Router) {}

  public async request(req: Observable<any>) {
    return firstValueFrom(req);
  }

  async login(email: string, password: string) {
    try {
      const res = await this.request(
        this.http.post(`${this.URL}/auth/login`, {
          email,
          password,
        })
      );

      this.setCurrentUser(res);

      return res;
    } catch (error) {
      throw error;
    }
  }

  // Manipulate user
  setCurrentUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    const token = JSON.parse(user);

    return token.access_token;
  }

  getCurrentUser() {
    // Pegar o user local
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    const token = JSON.parse(user);
    return this.request(this.http.get(`${this.URL}/users/${token.id}`));
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
