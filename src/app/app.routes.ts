import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ROUTES } from './shared/constants/routes.constants';
import { restaurantDetailsRoutes } from './pages/restaurant-details/restaurant-details.routes';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
  { path: ROUTES.HOME, component: HomeComponent },
  {
    path: ROUTES.RESTAURANTS,
    children: restaurantDetailsRoutes,
  },
  { path: ROUTES.SIGN_UP, component: RegistrationComponent },
  { path: '**', redirectTo: ROUTES.HOME },
];
