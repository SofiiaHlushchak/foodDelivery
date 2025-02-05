import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserRegistrationData } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-auth-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent {
  @Input() isLogin = false;
  @Output() formSubmit = new EventEmitter<UserRegistrationData>();

  private fb = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/
        ),
      ],
    ],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const formValues = this.authForm.value;

    this.formSubmit.emit(formValues);
  }
}
