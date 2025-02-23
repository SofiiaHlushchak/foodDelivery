import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { NovaPostDepartment } from '../shared/interfaces/nova-post.interface';

@Injectable({
  providedIn: 'root',
})
export class NovaPostService {
  private apiUrl = `${environment.API_URL}/api/novaposhta`;
  private http = inject(HttpClient);

  getDepartments(city: string): Observable<string[]> {
    return this.http
      .get<NovaPostDepartment[]>(`${this.apiUrl}/warehouses?cityName=${city}`)
      .pipe(
        map(response => {
          const departments = response.map(dep => dep.description);
          return departments;
        }),
        catchError(error => {
          console.error('Error while loading departments:', error);
          return of([]);
        })
      );
  }
}
