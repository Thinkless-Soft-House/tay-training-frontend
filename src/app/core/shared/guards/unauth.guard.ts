import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const unauthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return handleCheck(router);
};

function handleCheck(router: Router) {
  const user = localStorage.getItem('user');

  if (user) {
    router.navigate(['/']);
    return false;
  }
  return true;
}
