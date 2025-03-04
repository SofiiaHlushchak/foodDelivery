import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CardService } from '../../services/card.service';
import { PaymentCard } from '../../shared/interfaces/payment-card.interface';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { CardNumberPipe } from '../../shared/pipes/card-number.pipe';
import { PaymentMethod } from '../../shared/enums/payment-method.enum';
import { CardTypePipe } from '../../shared/pipes/card-type.pipe';
import { NgxPayPalModule, IPayPalConfig, IOrderDetails } from 'ngx-paypal';
import { NotificationService } from '../../services/notification.service';
import { ROUTES } from '../../shared/constants/routes.constants';
import { environment } from '../../environments/environment';
import { ApplePayService } from '../../services/apple-pay.service';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CardNumberPipe,
    CardTypePipe,
    NgxPayPalModule,
  ],
  templateUrl: './payment.component.html',
  styles: [
    `
      :host {
        flex: 1;
        margin-top: 100px;
      }
    `,
  ],
})
export class PaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private cardService = inject(CardService);
  private cardTypePipe = inject(CardTypePipe);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private applePayService = inject(ApplePayService);

  applePayQRCode: string | null = null;

  paymentMethodEnum = PaymentMethod;

  user$: Observable<UserLoggedData | null> = this.authService.userSubject$;

  paymentForm!: FormGroup;
  paymentMethods: { value: PaymentCard | string; img: string; alt: string }[] =
    [];

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  get paymentMethod(): FormControl {
    return this.paymentForm.get('paymentMethod') as FormControl;
  }

  get isButtonDisabled(): boolean {
    return (
      this.paymentForm.invalid ||
      this.paymentMethod.value === this.paymentMethodEnum.Paypal
    );
  }

  ngOnInit(): void {
    this.initForm();
    this.loadUserCards();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
    });
  }

  loadUserCards() {
    this.cardService.getUserCards().subscribe({
      next: (cards: PaymentCard[]) => {
        const userCards = cards.map(card => ({
          value: card,
          img:
            this.cardTypePipe.transform(card.cardNumber) ??
            '../../../assets/images/mastercard.png',
          alt: 'card',
        }));

        this.paymentMethods = [...userCards];

        if (this.paymentMethods.length) {
          this.paymentForm.patchValue({
            paymentMethod: this.paymentMethods[0].value,
          });
        }
      },
      error: error => console.error('Error loading user cards:', error),
    });
  }

  submitForm() {
    const paymentData = this.paymentForm.value;
    console.log(
      paymentData.paymentMethod
        ? 'Payment Data:'
        : 'Please select a payment method!',
      paymentData
    );

    this.router.navigate([`${ROUTES.ORDERS}`]);
  }

  async generateApplePayQR() {
    this.applePayQRCode = await this.applePayService.generateApplePayQR(
      this.totalPrice
    );
  }

  paypalConfig: IPayPalConfig = {
    clientId: environment.payPalClientId,
    currency: 'USD',
    createOrderOnClient: () => {
      return {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              value: this.totalPrice.toFixed(2),
              currency_code: 'USD',
            },
            items: [],
          },
        ],
      };
    },
    onApprove: (_, actions) => {
      return actions.order.capture().then((details: IOrderDetails) => {
        if (details.payer && details.payer.name) {
          console.log(
            'Transaction completed by ' + details.payer.name.given_name
          );
          this.notificationService.showMessage(
            'Payment successful and order created'
          );
          this.submitForm();
        } else {
          this.notificationService.showMessage('Payer information is missing');
        }
      });
    },
    onCancel: () => {
      this.notificationService.showMessage('Payment cancelled');
    },
    onError: err => {
      console.error('PayPal Payment Error: ', err);
      this.notificationService.showMessage('An error occurred during payment');
    },
  };
}
