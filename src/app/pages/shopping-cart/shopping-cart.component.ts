import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { QuantityControlComponent } from '../../shared/components/quantity-control/quantity-control.component';
import { AddonCheckboxComponent } from '../../shared/components/addon-checkbox/addon-checkbox.component';
import { startWith } from 'rxjs';
import { CartItemInterface } from '../../shared/interfaces/cart.interface';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes.constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    QuantityControlComponent,
    AddonCheckboxComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  cartForm!: FormGroup;
  orderSummary: { label: string; value: number }[] = [];

  get items(): FormArray<FormGroup> {
    return this.cartForm.get('items') as FormArray<FormGroup>;
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  ngOnInit(): void {
    this.initForm();
    this.cartForm.valueChanges
      .pipe(startWith(this.cartForm.value), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.updateCart();
        this.calculateTotals();
      });
  }

  private initForm(): void {
    const cartItems = this.cartService.getCartItems() || [];
    this.cartForm = this.fb.group({
      items: this.fb.array(
        cartItems.map(item => this.createCartItemGroup(item))
      ),
    });
  }

  private createCartItemGroup(item: CartItemInterface): FormGroup {
    return this.fb.group({
      dish: item.dish,
      addons: this.fb.array(
        item.addons.map(addon => this.fb.group({ ...addon }))
      ),
      quantity: item.quantity,
    });
  }

  private calculateTotals(): void {
    const { subtotal, delivery, tax, total } = this.cartService.calculateTotals(
      this.items.value
    );

    this.orderSummary = [
      { label: 'Subtotal', value: subtotal },
      { label: 'Tax and Fees', value: tax },
      { label: 'Delivery', value: delivery },
      { label: 'Total', value: total },
    ];
  }

  getAddons(item: FormGroup): FormArray<FormGroup> {
    return item.get('addons') as FormArray<FormGroup>;
  }

  updateCart(): void {
    this.cartService.setCartItems(this.items.value);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onQuantityChange(index: number, newQuantity: number): void {
    this.items.at(index).patchValue({ quantity: newQuantity });
  }

  onSubmit(): void {
    if (this.cartForm.valid) {
      this.router.navigate([`${ROUTES.PAYMENT}`]);
    } else {
      console.log('Form is invalid');
    }
  }
}
