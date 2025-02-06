import { Routes } from '@angular/router';

import { ROUTES } from './shared/constants/routes.constants';
import { HomeComponent } from './pages/home/home.component';
import { restaurantDetailsRoutes } from './pages/restaurant-details/restaurant-details.routes';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
  { path: ROUTES.HOME, component: HomeComponent },
  {
    path: ROUTES.RESTAURANTS,
    children: restaurantDetailsRoutes,
  },
  { path: ROUTES.SIGN_UP, component: RegistrationComponent },
  { path: ROUTES.LOG_IN, component: LoginComponent },
  { path: '**', redirectTo: ROUTES.HOME },
];
