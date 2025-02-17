import { Component } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  template: `
    <button
      class="flex items-center gap-2.5 rounded-full bg-primary py-1.5 pl-1.5 pr-4 uppercase text-white shadow-main-button"
      type="submit">
      <div class="flex rounded-full bg-white p-3">
        <i class="fa-solid fa-bag-shopping h-4 w-4 text-primary"></i>
      </div>
      Add to Cart
    </button>
  `,
})
export class AddToCartButtonComponent {}
