import { Component, inject, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Observable } from 'rxjs';
import { CardInterface } from '../../shared/interfaces/card.interface';
import { CardTypeEnum } from '../../shared/enums/card-type.enum';
import { CardConfigInterface } from '../../shared/interfaces/card-config.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    PrimaryCardComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  configAvatar = true;
  configRestaurant: CardConfigInterface = {
    displayDeliveryInfo: true,
    displayCategories: true,
  };
  restaurants$!: Observable<CardInterface[]>;

  private restaurantsService = inject(RestaurantsService);

  ngOnInit() {
    this.restaurants$ = this.restaurantsService.restaurants$;
    this.restaurantsService.getRestaurants().subscribe();
  }

  onToggleFavourite(itemId: string): void {
    this.restaurantsService.toggleFavourite(itemId, CardTypeEnum.Restaurant);
  }
}
