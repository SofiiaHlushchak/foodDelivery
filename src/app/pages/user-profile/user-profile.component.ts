import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NovaPostService } from '../../services/nova-post.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { DecorativeShapesComponent } from '../../shared/components/decorative-shapes/decorative-shapes.component';
import { UserService } from '../../services/user.service';
import { ROUTES } from '../../shared/constants/routes.constants';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { UserInfoComponent } from '../../shared/components/user-info/user-info.component';

@Component({
  selector: 'app-user-profile',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DecorativeShapesComponent,
    UserInfoComponent,
  ],
  templateUrl: './user-profile.component.html',
  styles: [
    `
      :host {
        flex: 1;
        margin-top: 100px;
      }
    `,
  ],
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  novaPostDepartments: string[] = [];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private novaPostService = inject(NovaPostService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  private lastCity = '';
  user?: UserLoggedData;

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();
  }

  initForm() {
    this.userProfileForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      deliveryAddress: this.fb.group({
        city: [''],
        street: [''],
        region: [''],
      }),
      novaPostDepartment: [''],
      age: ['', [Validators.min(16)]],
    });
  }

  loadUserData(): void {
    this.authService.getLoggedUser().subscribe({
      next: user => {
        this.user = user;
        this.userProfileForm.patchValue({
          name: user.name,
          email: user.email,
          phoneNumber: user?.phoneNumber,
          deliveryAddress: {
            city: user.deliveryAddress?.city,
            street: user.deliveryAddress?.street,
            region: user.deliveryAddress?.region,
          },
          novaPostDepartment: user.novaPostDepartment,
          age: user.age,
        });

        if (user.deliveryAddress?.city) {
          this.onCityBlur();
        }
      },
      error: err => {
        console.error('Error loading user data:', err);
      },
    });
  }

  onCityBlur(): void {
    const cityControl = this.userProfileForm.get('deliveryAddress.city');
    const cityName = cityControl?.value ? cityControl.value.trim() : '';

    if (cityName && cityName !== this.lastCity) {
      this.lastCity = cityName;
      this.novaPostService
        .getDepartments(cityName)
        .subscribe((departments: string[]) => {
          this.novaPostDepartments = departments;
        });
    }
  }

  updateProfile(): void {
    if (this.userProfileForm.invalid) return;

    this.userService.updateUserProfile(this.userProfileForm.value).subscribe({
      next: () => this.router.navigate([`${ROUTES.HOME}`]),
      error: err => console.error('Error updating profile', err),
    });
  }
}
