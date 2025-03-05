import { PaymentMethod } from '../enums/payment-method.enum';
import { CartItemInterface } from './cart.interface';

export interface Order {
  totalPrice: number;
  foodItems: CartItemInterface[];
  paymentMethod?: PaymentMethod;
  cardNumber?: string;
  status?: string;
  number?: number;
  createdAt?: Date;
}
