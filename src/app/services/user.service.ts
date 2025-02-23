import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { UserLoggedData } from '../shared/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.API_URL}/api/users`;
  private http = inject(HttpClient);

  updateUserProfile(data: UserLoggedData): Observable<UserLoggedData> {
    return this.http.put<UserLoggedData>(`${this.apiUrl}/update`, data);
  }
}
