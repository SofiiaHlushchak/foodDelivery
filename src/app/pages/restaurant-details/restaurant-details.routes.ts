import { Routes } from '@angular/router';
import { RestaurantResolver } from '../../resolvers/restaurant.resolver';
import { RestaurantsGuard } from '../../guards/restaurants.guard';
import { ROUTE_PARAMS } from '../../shared/constants/routes.constants';

export const restaurantDetailsRoutes: Routes = [
  {
    path: ROUTE_PARAMS.ID,
    loadComponent: () =>
      import('./restaurant-details.component').then(
        m => m.RestaurantDetailsComponent
      ),
    resolve: {
      restaurant: RestaurantResolver,
    },
    canActivate: [RestaurantsGuard],
  },
];
