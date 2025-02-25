import { Injectable } from '@angular/core';
import { CartItemInterface } from '../shared/interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';

  getCartItems(): CartItemInterface[] {
    return JSON.parse(localStorage.getItem(this.cartKey) || '[]');
  }

  setCartItems(cartItems: CartItemInterface[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartItems));
  }

  addToCart(item: CartItemInterface): void {
    const existingCart = this.getCartItems();
    const existingDishIndex = existingCart.findIndex(
      cartItem => cartItem.dish.id === item.dish.id
    );

    if (existingDishIndex !== -1) {
      existingCart[existingDishIndex].quantity += item.quantity;
      existingCart[existingDishIndex].addons = item.addons;
    } else {
      existingCart.push(item);
    }

    this.setCartItems(existingCart);
  }

  calculateAddonsPrice(item: CartItemInterface): number {
    return item.addons.reduce(
      (total, addon) => (addon.countable ? total + addon.price : total),
      0
    );
  }

  calculateTotals(items: CartItemInterface[]): {
    subtotal: number;
    delivery: number;
    tax: number;
    total: number;
  } {
    const subtotal = items.reduce((acc, item) => {
      const dishPrice = item.dish?.price ? item.dish.price * item.quantity : 0;
      return acc + dishPrice + this.calculateAddonsPrice(item);
    }, 0);

    const tax = subtotal * 0.1;
    const delivery = 1.33;
    const total = subtotal + tax + delivery;

    return { subtotal, delivery, tax, total };
  }

  getTotalPrice(): number {
    const cartItems = this.getCartItems();
    return this.calculateTotals(cartItems).total;
  }

  getTotalQuantity(): number {
    const cartItems = this.getCartItems();
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
