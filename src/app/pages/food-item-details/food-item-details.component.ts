import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AddonInterface,
  FoodItemInterface,
} from '../../shared/interfaces/food-item.interface';
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
import { CheckboxComponent } from '../../shared/components/checkbox/checkbox.component';
import { AddToCartButtonComponent } from '../../shared/components/add-to-cart-button/add-to-cart-button.component';

@Component({
  selector: 'app-food-item-details',
  imports: [
    FormatRatingCountPipe,
    CommonModule,
    ReactiveFormsModule,
    QuantityControlComponent,
    CheckboxComponent,
    AddToCartButtonComponent,
  ],
  templateUrl: './food-item-details.component.html',
  styleUrl: './food-item-details.component.scss',
})
export class FoodItemDetailsComponent implements OnInit {
  dish!: FoodItemInterface;
  quantity = 1;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  dishForm!: FormGroup;

  get addons(): FormArray<FormGroup> {
    return this.dishForm.get('addons') as FormArray<FormGroup>;
  }

  ngOnInit(): void {
    this.dish = this.route.snapshot.data['dish'];
    this.setForm();
  }

  setForm(): void {
    this.dishForm = this.fb.group({
      dishId: [this.dish.id],
      quantity: [this.quantity, [Validators.required, Validators.min(1)]],
      addons: this.fb.array([]),
    });

    this.setupAddonsControls();
  }

  setupAddonsControls(): void {
    this.dish.addons.forEach(addon => {
      this.addons.push(this.fb.group({ ...addon }));
    });
  }

  onQuantityChange(newQuantity: number): void {
    this.quantity = newQuantity;
    this.dishForm.patchValue({ quantity: this.quantity });
  }

  onSubmit(): void {
    const formValue = this.dishForm.value;
    const filteredFormValue = {
      ...formValue,
      addons: formValue.addons.filter(
        (addon: AddonInterface) => addon.countable
      ),
    };
    console.log('Adding to cart:', filteredFormValue);
  }
}
