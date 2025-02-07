import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthFormComponent } from '../../shared/components/auth-form/auth-form.component';
import { UserRegistrationData } from '../../shared/interfaces/auth.interface';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-registration',
  imports: [AuthFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/[A-Z]/),
        Validators.pattern(/[a-z]/),
        Validators.pattern(/\d/),
        Validators.pattern(/[@$!%*?&#]/),
      ],
    ],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  registerUser() {
    if (this.authForm.invalid) {
      return;
    }

    const userData: UserRegistrationData = this.authForm.value;

    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate([`${ROUTES.HOME}`]);
      },
      error: err => {
        console.error('Registration failed', err);
      },
    });
  }
}
