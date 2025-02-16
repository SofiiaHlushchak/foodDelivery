import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodItemInterface } from '../shared/interfaces/food-item.interface';
import { DishesService } from '../services/dishes.service';

@Injectable({
  providedIn: 'root',
})
export class FoodItemResolver implements Resolve<FoodItemInterface> {
  private dishesService = inject(DishesService);

  resolve(route: ActivatedRouteSnapshot): Observable<FoodItemInterface> {
    const id = route.paramMap.get('id')!;

    return this.dishesService.getDishById(id);
  }
}
