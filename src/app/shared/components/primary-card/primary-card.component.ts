import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardInterface } from '../../interfaces/card.interface';
import { CardConfigInterface } from '../../interfaces/card-config.interface';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';
import { RestaurantsService } from '../../../services/restaurants.service';

@Component({
  selector: 'app-primary-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './primary-card.component.html',
  styleUrls: ['./primary-card.component.css'],
})
export class PrimaryCardComponent {
  @Input() data!: CardInterface;
  @Input() config: CardConfigInterface = {};

  constructor(private restaurantsService: RestaurantsService) {}

  toggleFavorite(itemId: number, type: string) {
    this.restaurantsService.toggleFavorite(itemId, type);
  }
}
