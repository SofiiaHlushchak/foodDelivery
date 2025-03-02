// add-card.component.ts
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardTypePipe } from '../../shared/pipes/card-type.pipe';
import { TooltipDirective } from '../../shared/directives/tooltip.directive';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    ControlErrorHandlerPipe,
    CardTypePipe,
    TooltipDirective,
  ],
  templateUrl: './add-card.component.html',
  styles: [
    `
      :host {
        flex: 1;
        margin-top: 100px;
      }
    `,
  ],
})
export class AddCardComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private cardService = inject(CardService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

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
    this.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
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

      this.cardService.saveCard(cardData).subscribe(() => {
        this.router.navigate([`${ROUTES.PAYMENT}`]);
      });
    }
  }
}
