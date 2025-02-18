import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';
import { GoogleSigninComponent } from '../google-signin/google-signin.component';

@Component({
  selector: 'app-social-buttons',
  imports: [GoogleSigninComponent],
  templateUrl: './social-buttons.component.html',
  styleUrl: './social-buttons.component.scss',
})
export class SocialButtonsComponent {
  private authService = inject(AuthService);
  authSubscription!: Subscription;

  signInFacebookHandler(): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService.loginWithFacebook().subscribe({
      next: response => {
        this.authService.handleAuthSuccess(response.token);
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
      },
      error: err => {
        console.error('Google login error1', err);
      },
    });

    googleWrapper.click();
  }
}
