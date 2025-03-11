import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemInterface } from '../../shared/interfaces/food-item.interface';
import { FormatRatingCountPipe } from '../../shared/pipes/format-rating-count.pipe';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuantityControlComponent } from '../../shared/components/quantity-control/quantity-control.component';
import { AddonCheckboxComponent } from '../../shared/components/addon-checkbox/addon-checkbox.component';
import { AddToCartButtonComponent } from '../../shared/components/add-to-cart-button/add-to-cart-button.component';
import { CartService } from '../../services/cart.service';
import { ROUTES } from '../../shared/constants/routes.constants';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-food-item-details',
  imports: [
    FormatRatingCountPipe,
    CommonModule,
    ReactiveFormsModule,
    QuantityControlComponent,
    AddonCheckboxComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './food-item-details.component.html',
  styleUrl: './food-item-details.component.scss',
})
export class FoodItemDetailsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private router = inject(Router);
  private notificationService = inject(NotificationService);

  dish: FoodItemInterface = this.route.snapshot.data['dish'];
  quantity = 1;

  dishForm!: FormGroup;

  get addons(): FormArray<FormGroup> {
    return this.dishForm.get('addons') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.dishForm = this.fb.group({
      dish: [this.dish],
      quantity: [this.quantity, [Validators.required, Validators.min(1)]],
      addons: this.fb.array(
        this.dish.addons.map(addon => this.fb.group({ ...addon }))
      ),
    });
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity;
    this.dishForm.patchValue({ quantity: this.quantity });
  }

  onSubmit(): void {
    const formValue = this.dishForm.value;

    this.cartService.addToCart(formValue);
    const restaurantId = formValue.dish.restaurantId;
    this.notificationService.showMessage('Added to cart successfully!');

    this.router.navigate([ROUTES.RESTAURANTS, restaurantId]);
  }
}
