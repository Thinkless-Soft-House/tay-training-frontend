// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Obter o token do AuthService
    const token = this.authService.getToken();

    if (token) {
      // Clonar a requisição e adicionar o header de autorização
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Continuar com a requisição e tratar possíveis erros
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Se o erro for 401 Unauthorized, fazer logout
        if (error.status === 401 || error.status === 403) {
          // Realizar logout
          this.authService.logout();
          // Opcionalmente, você pode redirecionar para a página de login aqui
          // this.router.navigate(['/login']);
        }

        // Propagar o erro
        return throwError(() => error);
      })
    );
  }
}
