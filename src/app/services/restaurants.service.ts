import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { RestaurantInterface } from '../shared/interfaces/restaurant.interface';
import { CommonHelper } from '../shared/helpers/common.helper';

interface RestaurantFilters {
  searchQuery?: string;
  sortBy?: string;
  categories?: string[];
  rating?: string;
  priceFrom?: number | null;
  priceTo?: number | null;
  [key: string]: string | number | boolean | string[] | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private restaurantsUrl = `${environment.API_URL}/restaurants`;

  private restaurantsSubject = new BehaviorSubject<RestaurantInterface[]>([]);
  public restaurants$ = this.restaurantsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCachedRestaurants(): Observable<RestaurantInterface[]> {
    const cachedRestaurants = this.restaurantsSubject.getValue();

    return cachedRestaurants?.length
      ? of(cachedRestaurants)
      : this.getRestaurants();
  }

  getRestaurants(
    filters: RestaurantFilters = {}
  ): Observable<RestaurantInterface[]> {
    const cleanedParams = CommonHelper.removeBlankAttributes(filters);

    return this.http
      .get<
        RestaurantInterface[]
      >(this.restaurantsUrl, { params: cleanedParams })
      .pipe(
        tap(restaurants => {
          this.restaurantsSubject.next(restaurants);
        }),
        catchError(error => {
          console.error('Error fetching restaurants:', error);
          return [];
        })
      );
  }

  setFilters(filters: RestaurantFilters): void {
    this.getRestaurants(filters).subscribe();
  }

  getRestaurantById(id: string): Observable<RestaurantInterface> {
    return this.http.get<RestaurantInterface>(`${this.restaurantsUrl}/${id}`);
  }

  updateRating(
    restaurantId: string,
    rating: number
  ): Observable<RestaurantInterface> {
    return this.http.put<RestaurantInterface>(
      `${this.restaurantsUrl}/${restaurantId}/update-rating`,
      { rating }
    );
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
