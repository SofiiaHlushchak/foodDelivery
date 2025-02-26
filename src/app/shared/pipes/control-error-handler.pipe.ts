import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'controlErrorHandler',
})
export class ControlErrorHandlerPipe implements PipeTransform {
  transform(
    errorKeys: ValidationErrors | null,
    fieldName: string
  ): string | null {
    if (!errorKeys) return null;

    if (errorKeys['required']) {
      return `${fieldName} is required.`;
    }
    if (errorKeys['minlength']) {
      return `${fieldName} must be at least ${errorKeys['minlength'].requiredLength} characters long.`;
    }
    if (errorKeys['email']) {
      return 'Please enter a valid email.';
    }
    if (errorKeys['pattern']) {
      return this.getPatternError(
        errorKeys['pattern'].requiredPattern,
        fieldName
      );
    }

    if (errorKeys['expired']) {
      return `${fieldName} cannot be in the past.`;
    }
    return null;
  }

  private getPatternError(pattern: string, fieldName: string): string {
    return (
      {
        '/[A-Z]/': `${fieldName} must contain at least one uppercase letter.`,
        '/[a-z]/': `${fieldName} must contain at least one lowercase letter.`,
        '/\\d/': `${fieldName} must contain at least one digit.`,
        '/[@$!%*?&#]/': `${fieldName} must contain at least one special character.`,
        '/^\\d{4}\\d{4}\\d{4}\\d{4}$/': `Please enter a valid ${fieldName}.`,
      }[pattern] || `Invalid ${fieldName} format.`
    );
  }
}
