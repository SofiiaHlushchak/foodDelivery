import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private restaurants = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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

  private dishes = [
    {
      id: 1,
      name: 'Chicken Hawaiian',
      imageUrl: '../../../../assets/images/dish.png',
      price: 10.35,
      ingredients: 'Chicken, Cheese and pineapple',
      rating: 4.5,
      reviews: 134,
      isFavorite: true,
    },
    {
      id: 2,
      name: 'Red n hot pizza',
      imageUrl: '../../../../assets/images/dish.png',
      price: 3.49,
      ingredients: 'Spicy chicken, beef',
      rating: 4.5,
      reviews: 134,
      isFavorite: false,
    },
  ];

  getRestaurants() {
    return this.restaurants;
  }

  getDishes() {
    return this.dishes;
  }

  toggleFavorite(itemId: number, type: string) {
    const listItems = type === 'restaurant' ? this.restaurants : this.dishes;

    const item = listItems.find(i => i.id === itemId);

    if (item) {
      item.isFavorite = !item.isFavorite;
    }
  }
}
