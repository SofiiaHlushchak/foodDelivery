import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  GoogleInitOptions,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { environment } from './environments/environment';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

const googleLoginOptions: GoogleInitOptions = {
  oneTapEnabled: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId,
              googleLoginOptions
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookClientId),
          },
        ],
        onError: error => {
          console.error(error);
        },
      } as SocialAuthServiceConfig,
    },
  ],
};
