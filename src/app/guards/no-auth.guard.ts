import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ROUTES } from '../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private router = inject(Router);

  canActivate(): boolean {
    const token = localStorage.getItem('authToken');

    if (token) {
      this.router.navigate([ROUTES.HOME]);
      return false;
    }

    return true;
  }
}
