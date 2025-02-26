import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberFormat',
})
export class CardNumberPipe implements PipeTransform {
  transform(cardNumber?: string): string[] {
    if (!cardNumber) return [];

    return cardNumber.match(/.{1,4}/g) || [];
  }
}
