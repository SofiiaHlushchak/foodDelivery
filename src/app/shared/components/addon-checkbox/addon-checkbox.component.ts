import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-addon-checkbox',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <label
      class="flex cursor-pointer items-center justify-between"
      [formGroup]="formGroup">
      <div class="flex items-center gap-3">
        <span class="text-lg font-medium">{{ formGroup.value.name }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span *ngIf="formGroup.value.price" class="text-gray-500"
          >+{{ formGroup.value.price | currency }}</span
        >
        <input
          type="checkbox"
          formControlName="countable"
          class="peer hidden" />
        <div
          class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-manatee before:h-3 before:w-3 before:rounded-full before:content-['']"
          [ngClass]="{
            'border-primary': formGroup.value.countable,
            'before:bg-primary': formGroup.value.countable,
          }"></div>
      </div>
    </label>
  `,
})
export class AddonCheckboxComponent {
  @Input() formGroup!: FormGroup;
}
