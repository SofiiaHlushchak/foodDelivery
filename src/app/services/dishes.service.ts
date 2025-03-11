import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { FoodItemInterface } from '../shared/interfaces/food-item.interface';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  private dishesUrl = `${environment.API_URL}/dishes`;

  private dishesSubject = new BehaviorSubject<FoodItemInterface[]>([]);
  public dishes$ = this.dishesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getDishes(): Observable<FoodItemInterface[]> {
    return this.http.get<FoodItemInterface[]>(`${this.dishesUrl}`).pipe(
      map(dishes => dishes.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))),
      tap(dishes => this.dishesSubject.next(dishes))
    );
  }

  getCachedDishes(): Observable<FoodItemInterface[]> {
    const cachedDishes = this.dishesSubject.getValue();

    return cachedDishes?.length ? of(cachedDishes) : this.getDishes();
  }

  getDishById(id: string): Observable<FoodItemInterface> {
    return this.http.get<FoodItemInterface>(`${this.dishesUrl}/${id}`);
  }

  toggleFavourite(itemId: string): void {
    this.dishesSubject.next(
      this.dishesSubject
        .getValue()
        .map(item =>
          item.id === itemId
            ? { ...item, isFavourite: !item.isFavourite }
            : item
        )
    );
  }
}
