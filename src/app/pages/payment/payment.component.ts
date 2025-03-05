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
import { AddonInterface } from '../../shared/interfaces/food-item.interface';
import { CartItemInterface } from '../../shared/interfaces/cart.interface';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/interfaces/order.interface';

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
  private orderService = inject(OrderService);

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

  getFoodItemsFromCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    return cartItems.map((item: CartItemInterface) => ({
      foodId: item.dish?._id,
      quantity: item.quantity,
      addons: item.addons.map((addon: AddonInterface) => ({
        name: addon.name,
        price: addon.price,
        countable: addon.countable,
      })),
    }));
  }

  submitForm() {
    const paymentData = this.paymentForm.value;

    const order: Order = {
      totalPrice: this.totalPrice,
      foodItems: this.getFoodItemsFromCart(),
    };

    if (
      typeof paymentData.paymentMethod === 'object' &&
      paymentData.paymentMethod.cardNumber
    ) {
      order.paymentMethod = PaymentMethod.Card;
      order.cardNumber = paymentData.paymentMethod.cardNumber;
    } else if (
      paymentData.paymentMethod === PaymentMethod.Paypal ||
      paymentData.paymentMethod === PaymentMethod.ApplePay
    ) {
      order.paymentMethod = paymentData.paymentMethod as PaymentMethod;
    } else {
      console.log('Invalid payment method!');
      return;
    }

    this.orderService.createOrder(order).subscribe({
      next: () => {
        localStorage.removeItem('cart');
        this.router.navigate([`${ROUTES.ORDERS}`]);
      },
      error: error => console.error('Error creating order:', error),
    });
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
