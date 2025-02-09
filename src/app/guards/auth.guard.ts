import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ROUTES } from '../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      return true;
    } else {
      this.router.navigate([ROUTES.LOG_IN]);
      return false;
    }
  }
}
