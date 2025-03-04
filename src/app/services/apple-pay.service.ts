import { inject, Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApplePayService {
  private http = inject(HttpClient);

  private stripe: Stripe | null = null;
  private apiUrl = `${environment.API_URL}/api/payments/create-payment-link`;

  async initStripe() {
    if (!this.stripe) {
      try {
        this.stripe = await loadStripe(environment.stripePublicKey);
        if (!this.stripe) {
          throw new Error('Stripe failed to initialize');
        }
      } catch (error) {
        console.error('Error initializing Stripe:', error);
      }
    }
  }

  async generateApplePayQR(totalPrice: number): Promise<string | null> {
    await this.initStripe();
    if (!this.stripe) {
      console.error('Stripe is not initialized');
      return null;
    }

    if (totalPrice <= 0) {
      console.error('Invalid order amount');
      return null;
    }

    try {
      const response = await firstValueFrom<{ url: string }>(
        this.http.post<{ url: string }>(this.apiUrl, { totalPrice })
      );
      const stripePaymentLink = response.url;

      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(stripePaymentLink)}`;
      return qrCodeUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  }
}
