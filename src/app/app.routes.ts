import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes.constants';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { restaurantDetailsRoutes } from './pages/restaurant-details/restaurant-details.routes';
import { RouteConfigData } from './shared/interfaces/route-config-data.interface';
import { foodItemDetailsRoutes } from './pages/food-item-details/food-item-details.routes';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
      {
        path: ROUTES.HOME,
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {
          headerTitle: 'Deliver to',
          headerSubtitle: 'Pretty View Lane',
          headerPictureDisplay: true,
          headerMenuButtonVisible: true,
          footerVisible: true,
        } as RouteConfigData,
      },
      {
        path: ROUTES.RESTAURANTS,
        children: restaurantDetailsRoutes,
      },
      {
        path: ROUTES.DISHES,
        children: foodItemDetailsRoutes,
      },
    ],
  },
  {
    path: ROUTES.SIGN_UP,
    component: RegistrationComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: ROUTES.LOG_IN,
    component: LoginComponent,
    canActivate: [NoAuthGuard],
  },
  { path: '**', redirectTo: ROUTES.HOME },
];
