import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatRatingCount',
  standalone: true,
})
export class FormatRatingCountPipe implements PipeTransform {
  transform(value: number): string {
    return value < 25 ? value.toString() : `${Math.floor(value / 25) * 25}+`;
  }
}
