import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CardInterface } from '../shared/interfaces/card.interface';
import { environment } from '../environments/environment';
import { CardTypeEnum } from '../shared/enums/card-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private baseUrl = environment.API_URL;

  private restaurantsSubject = new BehaviorSubject<CardInterface[]>([]);
  private dishesSubject = new BehaviorSubject<CardInterface[]>([]);

  public restaurants$ = this.restaurantsSubject.asObservable();
  public dishes$ = this.dishesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<CardInterface[]> {
    return this.http
      .get<CardInterface[]>(`${this.baseUrl}/restaurants`)
      .pipe(tap(restaurants => this.restaurantsSubject.next(restaurants)));
  }

  getDishes(): Observable<CardInterface[]> {
    return this.http.get<CardInterface[]>(`${this.baseUrl}/dishes`).pipe(
      map(dishes => dishes.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))),
      tap(dishes => this.dishesSubject.next(dishes))
    );
  }

  toggleFavourite(itemId: string, type: CardTypeEnum): void {
    const subject =
      type === CardTypeEnum.Restaurant
        ? this.restaurantsSubject
        : this.dishesSubject;
    subject.next(
      subject
        .getValue()
        .map(item =>
          item.id === itemId
            ? { ...item, isFavourite: !item.isFavourite }
            : item
        )
    );
  }
}
