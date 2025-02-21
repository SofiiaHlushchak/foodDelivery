import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

  getCachedRestaurants(): Observable<RestaurantInterface[]> {
    const cachedRestaurants = this.restaurantsSubject.getValue();

    return cachedRestaurants?.length
      ? of(cachedRestaurants)
      : this.getRestaurants();
  }

  getRestaurants(
    query = '',
    sortBy = '',
    categories: string[] = [],
    rating = '',
    priceFrom: number | null = null,
    priceTo: number | null = null
  ): Observable<RestaurantInterface[]> {
    let params = new HttpParams();
    if (query) params = params.set('name', query);
    if (sortBy) params = params.set('sortBy', sortBy);
    if (categories.length)
      params = params.set('categories', categories.join(','));
    if (rating) params = params.set('rating', rating);
    if (priceFrom) params = params.set('priceFrom', priceFrom.toString());
    if (priceTo) params = params.set('priceTo', priceTo.toString());

    return this.http
      .get<RestaurantInterface[]>(this.restaurantsUrl, { params })
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

  setFilters(
    query = '',
    sortBy = '',
    categories: string[] = [],
    rating = '',
    priceFrom: number | null = null,
    priceTo: number | null = null
  ): void {
    this.getRestaurants(
      query,
      sortBy,
      categories,
      rating,
      priceFrom,
      priceTo
    ).subscribe();
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
