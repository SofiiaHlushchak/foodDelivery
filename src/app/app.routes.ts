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
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AddCardComponent } from './pages/add-card/add-card.component';

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
      {
        path: ROUTES.CART,
        component: ShoppingCartComponent,
        canActivate: [AuthGuard],
        data: {
          headerTitle: 'Cart',
          headerIcon: true,
          headerIconClass: 'fa-solid fa-bag-shopping',
          headerBackButtonVisible: true,
          cartItemsVisible: true,
        } as RouteConfigData,
      },
      {
        path: ROUTES.PROFILE,
        component: UserProfileComponent,
        canActivate: [AuthGuard],
        data: {
          headerBackButtonVisible: true,
        } as RouteConfigData,
      },
      {
        path: ROUTES.PAYMENT,
        component: PaymentComponent,
        canActivate: [AuthGuard],
        data: {
          headerBackButtonVisible: true,
          headerTitle: 'Payment',
          headerIcon: true,
          headerIconClass: 'fa-solid fa-money-check',
        } as RouteConfigData,
        children: [
          {
            path: 'add-card',
            component: AddCardComponent,
            canActivate: [AuthGuard],
            data: {
              headerBackButtonVisible: true,
              headerTitle: 'Add New Card',
              headerIcon: true,
              headerIconClass: 'fa-solid fa-money-check',
            } as RouteConfigData,
          },
        ],
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
