import { Component, OnInit, inject, DestroyRef } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

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
  private destroyRef = inject(DestroyRef);

  private lastCity = '';
  user$: Observable<UserLoggedData | null> = this.authService.userSubject$;

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
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: user => {
        if (user) {
          this.fillUserProfileForm(user);
          if (user.deliveryAddress?.city) {
            this.onCityBlur();
          }
        }
      },
      error: err => console.error('Error loading user data:', err),
    });
  }

  private fillUserProfileForm(user: UserLoggedData): void {
    this.userProfileForm.patchValue({
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      deliveryAddress: {
        city: user.deliveryAddress?.city,
        street: user.deliveryAddress?.street,
        region: user.deliveryAddress?.region,
      },
      novaPostDepartment: user.novaPostDepartment,
      age: user.age,
    });
  }

  getCityControl() {
    return this.userProfileForm.get('deliveryAddress.city');
  }

  getRegionControl() {
    return this.userProfileForm.get('deliveryAddress.region');
  }

  onCityBlur(): void {
    const cityControl = this.getCityControl();
    const cityName = cityControl?.value?.trim();

    if (!cityName) {
      this.clearAddressFieldsForCity();
    } else if (cityName && cityName !== this.lastCity) {
      this.lastCity = cityName;
      this.novaPostService
        .getDepartments(cityName)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (departments: string[]) => {
            this.novaPostDepartments = departments;
          },
          error: err => console.error('Failed to fetch departments:', err),
        });
    }
  }

  onRegionBlur(): void {
    const regionControl = this.getRegionControl();
    const regionName = regionControl?.value?.trim();

    if (!regionName) {
      this.clearAddressFieldsForRegion();
    }
  }

  private clearAddressFieldsForCity(): void {
    const deliveryAddress = this.userProfileForm.get('deliveryAddress');
    deliveryAddress?.get('street')?.setValue('');
    this.userProfileForm.get('novaPostDepartment')?.setValue('');
    this.novaPostDepartments = [];
  }

  private clearAddressFieldsForRegion(): void {
    const deliveryAddress = this.userProfileForm.get('deliveryAddress');
    deliveryAddress?.get('city')?.setValue('');
    deliveryAddress?.get('street')?.setValue('');
    this.userProfileForm.get('novaPostDepartment')?.setValue('');
    this.novaPostDepartments = [];
  }

  updateProfile(): void {
    if (this.userProfileForm.invalid) return;

    this.userService
      .updateUserProfile(this.userProfileForm.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.router.navigate([`${ROUTES.HOME}`]),
        error: err => console.error('Error updating profile', err),
      });
  }
}
