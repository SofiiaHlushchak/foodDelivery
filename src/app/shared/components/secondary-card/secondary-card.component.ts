import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInterface } from '../../interfaces/card.interface';
import { CardConfigInterface } from '../../interfaces/card-config.interface';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';
import { CardTypeEnum } from '../../enums/card-type.enum';

@Component({
  selector: 'app-secondary-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './secondary-card.component.html',
  styleUrls: ['./secondary-card.component.css'],
})
export class SecondaryCardComponent {
  @Input() data!: CardInterface;
  @Input() config: CardConfigInterface = {};
  @Output() toggleFavorite = new EventEmitter<{
    itemId: string;
    type: CardTypeEnum;
  }>();

  CardTypeEnum = CardTypeEnum;

  onToggleFavorite(itemId: string, type: CardTypeEnum) {
    this.toggleFavorite.emit({ itemId, type });
  }
}
