import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import {
  AuthResponse,
  UserLoginData,
  UserRegistrationData,
} from '../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/auth`;

  private http = inject(HttpClient);

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
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, userData).pipe(
      tap((response: AuthResponse) => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }
}
