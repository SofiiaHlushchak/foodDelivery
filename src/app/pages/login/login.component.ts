import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { UserLoginData } from '../../shared/interfaces/auth.interface';
import { AuthFormComponent } from '../../shared/components/auth-form/auth-form.component';
import { SocialButtonsComponent } from '../../shared/components/social-buttons/social-buttons.component';
import { Router, RouterModule } from '@angular/router';
import { DecorativeShapesComponent } from '../../shared/components/decorative-shapes/decorative-shapes.component';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AuthFormComponent,
    SocialButtonsComponent,
    DecorativeShapesComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './log-in.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

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
      next: response => {
        this.authService.handleAuthSuccess(response.token);
        this.router.navigate([ROUTES.HOME]);
      },
      error: err => {
        console.error('Login failed', err);
      },
    });
  }
}
