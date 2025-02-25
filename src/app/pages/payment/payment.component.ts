import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, CommonModule],
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

  user$: Observable<UserLoggedData | null> = this.authService.userSubject$;

  paymentForm!: FormGroup;

  paymentMethods = [
    {
      value: 'mastercard',
      img: '../../../assets/images/mastercard.png',
      alt: 'Mastercard',
    },
    {
      value: 'paypal',
      img: '../../../assets/images/paypal.png',
      alt: 'PayPal',
    },
    {
      value: 'apple-pay',
      img: '../../../assets/images/apple-pay.png',
      alt: 'Apple Pay',
    },
  ];

  get totalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.paymentForm.valid) {
      console.log('Payment Data:', this.paymentForm.value);
    } else {
      console.log('Please select a payment method!');
    }
  }
}
