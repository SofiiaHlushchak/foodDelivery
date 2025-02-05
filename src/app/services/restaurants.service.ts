import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { RestaurantInterface } from '../shared/interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private restaurantsUrl = `${environment.API_URL}/restaurants`;

  private restaurantsSubject = new BehaviorSubject<RestaurantInterface[]>([]);
  public restaurants$ = this.restaurantsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<RestaurantInterface[]> {
    return this.http
      .get<RestaurantInterface[]>(this.restaurantsUrl)
      .pipe(tap(restaurants => this.restaurantsSubject.next(restaurants)));
  }

  getRestaurantById(id: string): Observable<RestaurantInterface> {
    return this.http.get<RestaurantInterface>(`${this.restaurantsUrl}/${id}`);
  }

  toggleFavourite(itemId: string): void {
    this.restaurantsSubject.next(
      this.restaurantsSubject
        .getValue()
        .map(item =>
          item.id === itemId
            ? { ...item, isFavourite: !item.isFavourite }
            : item
        )
    );
  }
}
