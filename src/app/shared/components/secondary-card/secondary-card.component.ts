import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDataInterface } from '../../interfaces/card-data.interface';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';
import { CardTypeEnum } from '../../enums/card-type.enum';
import { RestaurantInterface } from '../../interfaces/restaurant.interface';
import { FoodItemInterface } from '../../interfaces/food-item.interface';

@Component({
  selector: 'app-secondary-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './secondary-card.component.html',
  styleUrls: ['./secondary-card.component.css'],
})
export class SecondaryCardComponent {
  @Input() card!: CardDataInterface;
  @Output() toggleFavorite = new EventEmitter<{
    itemId: string;
    type: CardTypeEnum;
  }>();

  CardTypeEnum = CardTypeEnum;

  get restaurantData(): RestaurantInterface {
    return this.card.data as RestaurantInterface;
  }

  get foodItemData(): FoodItemInterface {
    return this.card.data as FoodItemInterface;
  }

  onToggleFavorite(event: Event, itemId: string, type: CardTypeEnum) {
    event.preventDefault();
    event.stopPropagation();

    this.toggleFavorite.emit({ itemId, type });
  }
}
