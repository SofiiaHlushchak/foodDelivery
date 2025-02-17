import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RestaurantsService } from '../services/restaurants.service';
import { catchError, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsGuard implements CanActivate {
  private restaurantsService = inject(RestaurantsService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const restaurantId = route.paramMap.get('id');

    if (!restaurantId) {
      this.router.navigate(['/']);
      return of(false);
    }

    return this.restaurantsService.getRestaurants().pipe(
      take(1),
      map(restaurants => {
        const exists = restaurants.some(
          restaurant => restaurant.id === restaurantId
        );

        return exists ? true : this.router.createUrlTree(['/']);
      }),
      catchError(err => {
        console.error('Error occurred:', err);
        return of(this.router.createUrlTree(['/']));
      })
    );
  }
}
