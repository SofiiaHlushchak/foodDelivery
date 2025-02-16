import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DishesService } from '../services/dishes.service';
import { catchError, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FoodItemsGuard implements CanActivate {
  private foodItemsService = inject(DishesService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const foodItemId = route.paramMap.get('id');

    if (!foodItemId) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.foodItemsService.getDishes().pipe(
      take(1),
      switchMap(foodItems => {
        const exists = foodItems.find(foodItem => foodItem.id === foodItemId);

        return exists ? of(true) : (this.router.navigate(['/']), of(false));
      }),
      catchError(err => {
        console.error('Error occurred:', err);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
