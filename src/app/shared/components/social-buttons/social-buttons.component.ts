import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';
import { ROUTES } from '../../constants/routes.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-buttons',
  imports: [GoogleSigninComponent],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.scss',
})
export class SocialButtonsComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  authSubscription!: Subscription;

  signInFacebookHandler(): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.loginWithFacebook().subscribe({
      next: response => {
        this.authService.handleAuthSuccess(response.token);
        this.router.navigate([ROUTES.HOME]);
      },
      error: err => {
        console.error('Error during Facebook login', err);
      },
    });
  }

  googleSignin(googleWrapper: { click: () => void }): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.loginWithGoogle().subscribe({
      next: response => {
        this.authService.handleAuthSuccess(response.token);
        this.router.navigate([ROUTES.HOME]);
      },
      error: err => {
        console.error('Google login error', err);
      },
    });

    googleWrapper.click();
  }
}
