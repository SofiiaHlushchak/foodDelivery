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
    this.authService.loginWithFacebook().then(socialUser => {
      console.log('socialUser', socialUser);
      if (socialUser && socialUser.authToken) {
        this.authService.setSocialUser = socialUser;
        this.authService.handleAuthSuccess(socialUser.authToken);
      }
    });
  }

  googleSignin(googleWrapper: { click: () => void }): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.authService
      .loginWithGoogle()
      .subscribe(socialUser => {
        if (socialUser && socialUser.idToken) {
          this.authService.setSocialUser = socialUser;
          this.authService.handleAuthSuccess(socialUser.idToken);
        }
      });

    googleWrapper.click();
  }
}
