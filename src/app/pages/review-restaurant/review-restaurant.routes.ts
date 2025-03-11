import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RouteConfigData } from '../../shared/interfaces/route-config-data.interface';
import { OrderResolver } from '../../resolvers/order.resolver';
import { ROUTE_PARAMS, ROUTES } from '../../shared/constants/routes.constants';

export const reviewRestaurantRoutes: Routes = [
  {
    path: `${ROUTES.ORDERS}/${ROUTE_PARAMS.ID}/${ROUTES.FEEDBACK}`,
    loadComponent: () =>
      import('./review-restaurant.component').then(
        m => m.ReviewRestaurantComponent
      ),
    resolve: {
      order: OrderResolver,
    },
    canActivate: [AuthGuard],
    data: {
      headerBackButtonVisible: true,
    } as RouteConfigData,
  },
];
