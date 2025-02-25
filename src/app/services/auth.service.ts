import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  filter,
  Observable,
  switchMap,
  tap,
  throwError,
  take,
  from,
  BehaviorSubject,
  of,
} from 'rxjs';
import { environment } from '../environments/environment';
import {
  AuthResponse,
  UserLoggedData,
  UserLoginData,
  UserRegistrationData,
} from '../shared/interfaces/auth.interface';
import { Router } from '@angular/router';
import {
  FacebookLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private socialUser: SocialUser | null = null;
  private apiUrl = `${environment.API_URL}/api/auth`;
  private http = inject(HttpClient);
  private socialAuthService = inject(SocialAuthService);
  private router = inject(Router);
  public userSubject$ = new BehaviorSubject<UserLoggedData | null>(null);

  set setSocialUser(socialUser: SocialUser) {
    this.socialUser = socialUser;
  }

  setUser(user: UserLoggedData | null) {
    this.userSubject$.next(user);
  }

  handleAuthSuccess(token: string) {
    localStorage.setItem('authToken', token);
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

  loginWithGoogle(): Observable<AuthResponse> {
    return this.socialAuthService.authState.pipe(
      filter((user: SocialUser | null) => !!user?.idToken),
      tap(user => {
        if (user) {
          this.setSocialUser = user;
        }
      }),
      switchMap(user =>
        this.http.post<AuthResponse>(`${this.apiUrl}/google-login`, {
          token: user!.idToken,
        })
      ),
      take(1)
    );
  }

  loginWithFacebook(): Observable<AuthResponse> {
    return from(
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
    ).pipe(
      tap(user => {
        if (user) {
          this.setSocialUser = user;
        }
      }),
      switchMap(user =>
        this.http.post<AuthResponse>(`${this.apiUrl}/facebook-login`, {
          token: user.authToken,
        })
      ),
      take(1)
    );
  }

  getLoggedUser(): Observable<UserLoggedData> {
    return this.http.get<UserLoggedData>(`${this.apiUrl}/profile`).pipe(
      tap(user => this.setUser(user)),
      catchError(() => throwError(() => new Error('Failed to fetch user data')))
    );
  }

  getCachedUser(): Observable<UserLoggedData> {
    const cachedUser = this.userSubject$.value;
    return cachedUser ? of(cachedUser) : this.getLoggedUser();
  }

  logOut() {
    if (this.socialUser) {
      this.socialAuthService.signOut().then(() => {
        this.socialUser = null;
        this.clearSession();
      });
    } else {
      this.clearSession();
    }
  }

  private clearSession() {
    localStorage.removeItem('authToken');
    this.setUser(null);
    this.router.navigate(['/login']);
  }
}
