import { OrderStatus } from '../enums/order-status.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { CartItemInterface } from './cart.interface';

export interface Order {
  totalPrice: number;
  foodItems: CartItemInterface[];
  paymentMethod?: PaymentMethod;
  cardNumber?: string;
  status?: OrderStatus;
  number?: number;
  createdAt?: Date;
}
