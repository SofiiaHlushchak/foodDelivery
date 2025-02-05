import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';
import { CardTypeEnum } from '../../enums/card-type.enum';
import { CardDataInterface } from '../../interfaces/card-data.interface';
import { FoodItemInterface } from '../../interfaces/food-item.interface';
import { RestaurantInterface } from '../../interfaces/restaurant.interface';

@Component({
  selector: 'app-primary-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './primary-card.component.html',
  styleUrls: ['./primary-card.component.css'],
})
export class PrimaryCardComponent {
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
