import { Routes } from '@angular/router';
import { ROUTE_PARAMS } from '../../shared/constants/routes.constants';
import { FoodItemResolver } from '../../resolvers/food-item.resolver';
import { FoodItemsGuard } from '../../guards/food-items.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RouteConfigData } from '../../shared/interfaces/route-config-data.interface';

export const foodItemDetailsRoutes: Routes = [
  {
    path: ROUTE_PARAMS.ID,
    loadComponent: () =>
      import('./food-item-details.component').then(
        m => m.FoodItemDetailsComponent
      ),
    resolve: {
      dish: FoodItemResolver,
    },
    canActivate: [FoodItemsGuard, AuthGuard],
    data: {
      headerBackButtonVisible: true,
      headerFavouriteButtonVisible: true,
    } as RouteConfigData,
  },
];
