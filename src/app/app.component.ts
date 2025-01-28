import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service';
import { CardConfigInterface } from './shared/interfaces/card-config.interface';
import { CardInterface } from './shared/interfaces/card.interface';
import { PrimaryCardComponent } from './shared/components/primary-card/primary-card.component';
import { SecondaryCardComponent } from './shared/components/secondary-card/secondary-card.component';

@Component({
  selector: 'app-root',
  imports: [PrimaryCardComponent, SecondaryCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RestaurantsService],
})
export class AppComponent implements OnInit {
  title = 'food-delivery';
  configRestaurant: CardConfigInterface = {
    displayDeliveryInfo: true,
    displayCategories: true,
  };
  configDish: CardConfigInterface = {
    displayPrice: true,
    displayIngredients: true,
  };
  restaurants: CardInterface[] = [];
  dishes: CardInterface[] = [];

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.restaurants = this.restaurantsService.getRestaurants();
    this.dishes = this.restaurantsService.getDishes();
  }

  toggleFavorite(itemId: number, type: string) {
    this.restaurantsService.toggleFavorite(itemId, type);
  }
}
