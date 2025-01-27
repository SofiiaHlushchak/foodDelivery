import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PrimaryCardComponent } from './shared/components/primary-card/primary-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSlideToggleModule, PrimaryCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'food-delivery';
  restaurants = [
    {
      name: 'McDonalds',
      imageUrl: '../../../../assets/images/restaurant.png',
      rating: 4.5,
      reviews: 134,
      isDeliveryFree: true,
      isFavorite: true,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
    {
      name: 'Burger King',
      imageUrl: '../../../../assets/images/restaurant.png',
      rating: 4.2,
      reviews: 934,
      isFavorite: false,
      deliveryCost: 2,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
    {
      name: 'KFC',
      imageUrl: '../../../../assets/images/restaurant.png',
      rating: 4.3,
      reviews: 150,
      isFavorite: false,
      isDeliveryFree: true,
      deliveryTime: '10-15 mins',
      categories: ['Burger', 'chicken', 'fast food'],
    },
  ];
  dishes = [
    {
      name: 'Chicken Hawaiian',
      imageUrl: '../../../../assets/images/dish.png',
      price: 10.35,
      ingredients: 'Chicken, Cheese and pineapple',
      rating: 4.5,
      reviews: 134,
      isFavorite: true,
    },
    {
      name: 'Red n hot pizza',
      imageUrl: '../../../../assets/images/dish.png',
      price: 3.49,
      ingredients: 'Spicy chicken, beef',
      rating: 4.5,
      reviews: 134,
      isFavorite: false,
    },
  ];
}
