import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { UserRegistrationData } from '../shared/interfaces/auth.interface';

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
}
