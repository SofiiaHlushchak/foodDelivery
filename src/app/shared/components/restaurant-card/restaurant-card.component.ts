import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCardInterface } from '../../interfaces/restaurant-card.interface';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
})
export class RestaurantCardComponent {
  @Input() restaurants!: RestaurantCardInterface[];
}
