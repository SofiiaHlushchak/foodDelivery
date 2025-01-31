import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service';
import { CardConfigInterface } from './shared/interfaces/card-config.interface';
import { CardTypeEnum } from './shared/enums/card-type.enum';
import { Observable } from 'rxjs';
import { CardInterface } from './shared/interfaces/card.interface';
import { PrimaryCardComponent } from './shared/components/primary-card/primary-card.component';
import { SecondaryCardComponent } from './shared/components/secondary-card/secondary-card.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [PrimaryCardComponent, SecondaryCardComponent, AsyncPipe],
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

  restaurants$!: Observable<CardInterface[]>;
  dishes$!: Observable<CardInterface[]>;

  constructor(private restaurantsService: RestaurantsService) {}

  ngOnInit() {
    this.restaurants$ = this.restaurantsService.restaurants$;
    this.dishes$ = this.restaurantsService.dishes$;

    this.restaurantsService.getRestaurants().subscribe();
    this.restaurantsService.getDishes().subscribe();
  }

  onToggleFavourite(event: { itemId: string; type: CardTypeEnum }) {
    this.restaurantsService.toggleFavourite(event.itemId, event.type);
  }
}
