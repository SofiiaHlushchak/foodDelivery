import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCardInterface } from '../../interfaces/restaurant-card.interface';
import { FormatRatingCountPipe } from '../../pipes/format-rating-count.pipe';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule, FormatRatingCountPipe],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurant!: RestaurantCardInterface;
}
