import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

function clearLocalStorage() {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('token');
}

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      return authService.validateToken(token).pipe(
        map((isValid) => {
          if (isValid) {
            return true;
          } else {
            clearLocalStorage();
            router.navigate(['/login']);
            return false;
          }
        }),
        catchError(() => {
          clearLocalStorage();
          router.navigate(['/login']);
          return of(false);
        })
      );
    } else {
      clearLocalStorage();
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};
