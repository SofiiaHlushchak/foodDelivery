import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function expirationDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value || !/^\d{2}\/\d{2}$/.test(value)) return { pattern: true };

    const [month, year] = value.split('/');
    const expirationDate = new Date(`20${year}-${month}-01`);
    const currentDate = new Date();

    return expirationDate < currentDate ? { expired: true } : null;
  };
}
