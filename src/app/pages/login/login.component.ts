import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ROUTES } from '../../shared/constants/routes.constants';
import { UserLoginData } from '../../shared/interfaces/auth.interface';
import { AuthFormComponent } from '../../shared/components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './log-in.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }

    const userData: UserLoginData = this.loginForm.value;

    this.authService.login(userData).subscribe({
      next: () => {
        this.router.navigate([`${ROUTES.HOME}`]);
      },
      error: err => {
        console.error('Login failed', err);
      },
    });
  }
}
