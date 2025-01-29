import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardInterface } from '../shared/interfaces/card.interface';
import { environment } from '../environments/environment';
import { CardTypeEnum } from '../shared/enums/card-type.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<CardInterface[]> {
    return this.http.get<CardInterface[]>(`${this.baseUrl}/restaurants`);
  }

  getDishes(): Observable<CardInterface[]> {
    return this.http.get<CardInterface[]>(`${this.baseUrl}/dishes`);
  }

  toggleFavourite(
    itemId: string,
    type: CardTypeEnum,
    restaurants: CardInterface[],
    dishes: CardInterface[]
  ) {
    const listItems = type === CardTypeEnum.Restaurant ? restaurants : dishes;
    const item = listItems.find(i => i.id === itemId);

    if (item) {
      item.isFavourite = !item.isFavourite;
    }
  }
}
