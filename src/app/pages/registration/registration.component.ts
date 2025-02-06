import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
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

  registerUser(userData: UserRegistrationData) {
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
