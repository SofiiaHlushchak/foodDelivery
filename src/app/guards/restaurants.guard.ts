import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantsService } from '../services/restaurants.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsGuard implements CanActivate {
  private restaurantsService = inject(RestaurantsService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const restaurantId = route.paramMap.get('id');

    if (!restaurantId) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.restaurantsService.getRestaurants().pipe(
      map(restaurants => {
        const exists = restaurants.find(
          restaurant => restaurant.id === restaurantId
        );

        return exists ? true : (this.router.navigate(['/']), false);
      }),
      catchError(err => {
        console.error('Error occurred:', err);
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
