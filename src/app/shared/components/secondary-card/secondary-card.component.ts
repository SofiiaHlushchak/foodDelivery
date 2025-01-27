import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInterface } from '../../interfaces/card.interface';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';

@Component({
  selector: 'app-secondary-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './secondary-card.component.html',
  styleUrls: ['./secondary-card.component.css'],
})
export class SecondaryCardComponent {
  @Input() data!: CardInterface;
  @Input() config: {
    displayPrice?: boolean;
    displayIngredients?: boolean;
    displayDeliveryInfo?: boolean;
    displayCategories?: boolean;
  } = {};
}
