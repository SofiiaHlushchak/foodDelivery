// add-card.component.ts
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CardService } from '../../services/card.service';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { NgxMaskDirective } from 'ngx-mask';
import { ControlErrorHandlerPipe } from '../../shared/pipes/control-error-handler.pipe';
import { ROUTES } from '../../shared/constants/routes.constants';
import { Router } from '@angular/router';
import { expirationDateValidator } from '../../shared/validators/validator';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ControlErrorHandlerPipe,
  ],
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cardService = inject(CardService);
  private router = inject(Router);

  user$: Observable<UserLoggedData | null> = this.authService.userSubject$;

  cardForm: FormGroup = this.fb.group({
    name: [{ value: '', disabled: true }, [Validators.required]],
    number: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}\d{4}\d{4}\d{4}$/)],
    ],
    expires: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/),
        expirationDateValidator(),
      ],
    ],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  get name(): FormControl {
    return this.cardForm.get('name') as FormControl;
  }

  get number(): FormControl {
    return this.cardForm.get('number') as FormControl;
  }

  get expires(): FormControl {
    return this.cardForm.get('expires') as FormControl;
  }

  get cvv(): FormControl {
    return this.cardForm.get('cvv') as FormControl;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.cardForm.patchValue({
          name: user.name,
        });
      }
    });
  }

  saveCard(): void {
    if (this.cardForm.valid) {
      const formValues = this.cardForm.getRawValue();

      const cardData = {
        cardNumber: formValues.number,
        expirationDate: formValues.expires,
      };

      this.cardService.saveCard(cardData).subscribe(response => {
        this.router.navigate([`${ROUTES.PAYMENT}`]);
      });
    }
  }
}
