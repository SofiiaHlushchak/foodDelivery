import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
import { startWith, Subscription } from 'rxjs';
import { CartItemInterface } from '../../shared/interfaces/cart.interface';

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
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private formSubscription!: Subscription;
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);

  cartForm!: FormGroup;
  subtotal = 0;
  tax = 0;
  delivery = 1.33;
  orderSummary: { label: string; value: number }[] = [];

  get items(): FormArray<FormGroup> {
    return this.cartForm.get('items') as FormArray<FormGroup>;
  }

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  ngOnInit(): void {
    this.initForm();
    this.formSubscription = this.cartForm.valueChanges
      .pipe(startWith(this.cartForm.value))
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
    const { subtotal, tax } = this.cartService.calculateTotals(
      this.items.value
    );
    this.subtotal = subtotal;
    this.tax = tax;
    const total = this.subtotal + this.tax + this.delivery;

    this.orderSummary = [
      { label: 'Subtotal', value: this.subtotal },
      { label: 'Tax and Fees', value: this.tax },
      { label: 'Delivery', value: this.delivery },
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

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }
}
