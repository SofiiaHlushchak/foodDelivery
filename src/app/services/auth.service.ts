import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import {
  AuthResponse,
  UserLoginData,
  UserRegistrationData,
} from '../shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { ROUTES } from '../shared/constants/routes.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private socialUser?: SocialUser;
  private apiUrl = `${environment.API_URL}/api/auth`;
  private http = inject(HttpClient);
  private socialAuthService = inject(SocialAuthService);
  private router = inject(Router);

  set setSocialUser(socialUser: SocialUser) {
    this.socialUser = socialUser;
  }

  handleAuthSuccess(token: string) {
    localStorage.setItem('authToken', token);
    this.router.navigate([ROUTES.HOME]);
  }

  register(userData: UserRegistrationData): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/register`, userData)
      .pipe(
        catchError(() =>
          throwError(
            () =>
              new Error(
                'Something went wrong during registration. Please try again later.'
              )
          )
        )
      );
  }

  login(userData: UserLoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData);
  }

  loginWithGoogle(): Observable<SocialUser> {
    return this.socialAuthService.authState;
  }

  loginWithFacebook(): Promise<SocialUser> {
    return this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut() {
    if (this.socialUser) {
      this.socialAuthService.signOut().then(() => {
        this.clearSession();
      });
    } else {
      this.clearSession();
    }
  }

  private clearSession() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
