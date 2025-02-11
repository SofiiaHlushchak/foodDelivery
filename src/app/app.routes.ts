import { Routes } from '@angular/router';
import { ROUTES } from './shared/constants/routes.constants';
import { HomeComponent } from './pages/home/home.component';
import { restaurantDetailsRoutes } from './pages/restaurant-details/restaurant-details.routes';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: ROUTES.HOME, pathMatch: 'full' },
  {
    path: ROUTES.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ROUTES.RESTAURANTS,
    children: restaurantDetailsRoutes,
    canActivate: [AuthGuard],
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
