import { Component, EventEmitter, Output } from '@angular/core';

interface GoogleWrapper {
  click: () => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          renderButton: (container: HTMLElement, options: object) => void;
        };
      };
    };
  }
}

@Component({
  selector: 'app-google-signin',
  templateUrl: './google-signin.component.html',
  styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent {
  @Output() loginWithGoogle: EventEmitter<GoogleWrapper> =
    new EventEmitter<GoogleWrapper>();

  createFakeGoogleWrapper = (): GoogleWrapper => {
    const googleLoginWrapper = document.createElement('div');
    googleLoginWrapper.style.display = 'none';
    googleLoginWrapper.classList.add('custom-google-button');
    document.body.appendChild(googleLoginWrapper);

    window.google.accounts.id.renderButton(googleLoginWrapper, {
      type: 'icon',
      width: '200',
    });

    const googleLoginWrapperButton = googleLoginWrapper.querySelector(
      'div[role=button]'
    ) as HTMLElement;

    return {
      click: () => {
        googleLoginWrapperButton?.click();
      },
    };
  };

  handleGoogleLogin() {
    this.loginWithGoogle.emit(this.createFakeGoogleWrapper());
  }
}
