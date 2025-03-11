import { Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RouteConfigData } from '../../shared/interfaces/route-config-data.interface';
import { ROUTES } from '../../shared/constants/routes.constants';
import { OrdersResolver } from '../../resolvers/orders.resolver';

export const ordersRoutes: Routes = [
  {
    path: ROUTES.ORDERS,
    loadComponent: () =>
      import('./orders.component').then(m => m.OrdersComponent),
    resolve: {
      orders: OrdersResolver,
    },
    canActivate: [AuthGuard],
    data: {
      headerBackButtonVisible: true,
      headerTitle: 'My Orders',
      headerPictureDisplay: true,
      footerVisible: true,
    } as RouteConfigData,
  },
];
