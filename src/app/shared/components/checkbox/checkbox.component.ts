import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label
      class="flex cursor-pointer items-center justify-between"
      [formGroup]="formGroup">
      <div class="flex items-center gap-3">
        <span class="text-lg font-medium">{{ label }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span *ngIf="price" class="text-gray-500">+{{ price | currency }}</span>
        <input
          type="checkbox"
          formControlName="countable"
          class="peer hidden" />
        <div
          class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-manatee before:h-3 before:w-3 before:rounded-full before:content-['']"
          [ngClass]="{
            'border-primary': countable,
            'before:bg-primary': countable,
          }"></div>
      </div>
    </label>
  `,
})
export class CheckboxComponent {
  @Input() formGroup!: FormGroup;
  @Input() label!: string;
  @Input() price?: number;
  @Input() countable!: boolean;
}
