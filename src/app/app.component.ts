import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RestaurantCardComponent } from './shared/components/restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, RestaurantCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-delivery';
  restaurants = [
    {
      name: 'McDonalds',
      rating: 4.5,
      reviews: 134,
      isDeliveryFree: true,
      isFavorite: true,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
    {
      name: 'Burger King',
      rating: 4.2,
      reviews: 934,
      isFavorite: false,
      deliveryCost: 2,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
    {
      name: 'KFC',
      rating: 4.3,
      reviews: 150,
      isFavorite: false,
      isDeliveryFree: true,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
  ];
}
