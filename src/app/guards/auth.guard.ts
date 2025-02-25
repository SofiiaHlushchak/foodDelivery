import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ROUTES } from '../shared/constants/routes.constants';
import { map, Observable, of, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthService);

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('authToken');
    if (token) {
      return this.authService.getCachedUser().pipe(
        take(1),
        tap(user => !user && this.router.navigate([ROUTES.LOG_IN])),
        map(user => !!user)
      );
    } else {
      this.router.navigate([`${ROUTES.LOG_IN}}`]);
      return of(false);
    }
  }
}
