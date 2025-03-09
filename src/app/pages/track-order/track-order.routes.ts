import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RouteConfigData } from '../../shared/interfaces/route-config-data.interface';
import { OrderResolver } from '../../resolvers/order.resolver';
import { OrderStatusGuard } from '../../guards/order-status.guard';
import { ROUTE_PARAMS, ROUTES } from '../../shared/constants/routes.constants';

export const trackOrderRoutes: Routes = [
  {
    path: `${ROUTES.ORDERS}/${ROUTE_PARAMS.ID}/${ROUTES.TRACK}`,
    loadComponent: () =>
      import('./track-order.component').then(m => m.TrackOrderComponent),
    resolve: {
      order: OrderResolver,
    },
    canActivate: [AuthGuard, OrderStatusGuard],
    data: {
      headerBackButtonVisible: true,
      headerTitle: 'Order Tracking',
      headerPictureDisplay: true,
      pagePaddingHidden: true,
    } as RouteConfigData,
  },
];
