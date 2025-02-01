import { Component, inject, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service';
import { CardTypeEnum } from './shared/enums/card-type.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  providers: [RestaurantsService],
})
export class AppComponent implements OnInit {
  title = 'food-delivery';

  private restaurantsService = inject(RestaurantsService);

  ngOnInit() {
    this.restaurantsService.getRestaurants().subscribe();
    this.restaurantsService.getDishes().subscribe();
  }

  onToggleFavourite(event: { itemId: string; type: CardTypeEnum }) {
    this.restaurantsService.toggleFavourite(event.itemId, event.type);
  }
}
