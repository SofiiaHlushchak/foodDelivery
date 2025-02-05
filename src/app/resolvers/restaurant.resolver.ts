import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { Observable } from 'rxjs';
import { RestaurantInterface } from '../shared/interfaces/restaurant.interface';

@Injectable({
  providedIn: 'root',
})
export class RestaurantResolver implements Resolve<RestaurantInterface> {
  private restaurantsService = inject(RestaurantsService);

  resolve(route: ActivatedRouteSnapshot): Observable<RestaurantInterface> {
    const id = route.paramMap.get('id')!;

    return this.restaurantsService.getRestaurantById(id);
  }
}
