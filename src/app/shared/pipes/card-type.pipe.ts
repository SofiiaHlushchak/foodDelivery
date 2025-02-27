import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardType',
})
@Injectable({
  providedIn: 'root',
})
export class CardTypePipe implements PipeTransform {
  transform(cardNumber?: string): string | null {
    if (!cardNumber) return null;

    if (cardNumber.startsWith('4')) {
      return '../../../assets/images/visa.png';
    } else if (cardNumber.startsWith('5')) {
      return '../../../assets/images/mastercard.png';
    }

    return null;
  }
}
