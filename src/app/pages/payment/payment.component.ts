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
import { RouterModule } from '@angular/router';
import { CardService } from '../../services/card.service';
import { PaymentCard } from '../../shared/interfaces/payment-card.interface';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { CardNumberPipe } from '../../shared/pipes/card-number.pipe';
import { PaymentMethod } from '../../shared/enums/payment-method.enum';
import { CardTypePipe } from '../../shared/pipes/card-type.pipe';

@Component({
  selector: 'app-payment',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    CardNumberPipe,
    CardTypePipe,
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
  isAddCardRoute = false;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private cardService = inject(CardService);
  private cardTypePipe = inject(CardTypePipe);

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
  }
}
