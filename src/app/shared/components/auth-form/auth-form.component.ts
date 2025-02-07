import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ControlErrorHandlerPipe } from '../../pipes/control-error-handler.pipe';

@Component({
  selector: 'app-auth-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ControlErrorHandlerPipe,
    RouterModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  @Input() isLogin!: boolean;
  @Input() authForm!: FormGroup;
  @Output() formSubmit = new EventEmitter<void>();

  onSubmit() {
    if (this.authForm.invalid) return;
    this.formSubmit.emit();
  }
}
