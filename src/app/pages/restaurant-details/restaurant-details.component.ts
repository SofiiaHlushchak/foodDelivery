import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestaurantInterface } from '../../shared/interfaces/restaurant.interface';
import { CommonModule, Location } from '@angular/common';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { CardTypeEnum } from '../../shared/enums/card-type.enum';
import { DishesService } from '../../services/dishes.service';
import { FormatRatingCountPipe } from '../../shared/pipes/format-rating-count.pipe';
import { FoodItemInterface } from '../../shared/interfaces/food-item.interface';
import { ROUTES } from '../../shared/constants/routes.constants';

@Component({
  selector: 'app-restaurant-details',
  standalone: true,
  imports: [
    CommonModule,
    PrimaryCardComponent,
    FormatRatingCountPipe,
    RouterModule,
  ],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.scss',
})
export class RestaurantDetailsComponent implements OnInit {
  restaurant!: RestaurantInterface;
  topDishes: FoodItemInterface[] = [];

  CardTypeEnum = CardTypeEnum;
  ROUTES = ROUTES;

  private route = inject(ActivatedRoute);
  private dishesService = inject(DishesService);
  public location = inject(Location);

  ngOnInit(): void {
    this.restaurant = this.route.snapshot.data['restaurant'];
    if (this.restaurant?.foodItems) {
      this.topDishes = this.getTopFoodItems(this.restaurant.foodItems);
    }
  }

  getDisplayedFoodItemsCount(): number {
    return this.topDishes.length;
  }

  onToggleFavourite(itemId: string): void {
    this.dishesService.toggleFavourite(itemId);
  }

  private getTopFoodItems(foodItems: FoodItemInterface[]): FoodItemInterface[] {
    return [...foodItems]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, 5);
  }
}
