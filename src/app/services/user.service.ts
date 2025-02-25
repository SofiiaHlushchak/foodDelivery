import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { UserLoggedData } from '../shared/interfaces/auth.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.API_URL}/api/users`;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  updateUserProfile(data: UserLoggedData): Observable<UserLoggedData> {
    return this.http.patch<UserLoggedData>(`${this.apiUrl}/update`, data).pipe(
      tap(data => {
        this.authService.setUser(data);
      })
    );
  }
}
