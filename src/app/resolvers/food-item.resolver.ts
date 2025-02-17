import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FoodItemInterface } from '../shared/interfaces/food-item.interface';
import { DishesService } from '../services/dishes.service';

@Injectable({
  providedIn: 'root',
})
export class FoodItemResolver implements Resolve<FoodItemInterface | null> {
  private dishesService = inject(DishesService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<FoodItemInterface | null> {
    const id = route.paramMap.get('id')!;

    return this.dishesService.getDishById(id).pipe(
      catchError(() => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
