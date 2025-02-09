import { Component, inject, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Observable } from 'rxjs';
import { CardTypeEnum } from '../../shared/enums/card-type.enum';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { RestaurantInterface } from '../../shared/interfaces/restaurant.interface';
import { LogoutComponent } from '../../shared/components/logout/logout.component';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
    PrimaryCardComponent,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
    LogoutComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  configAvatar = true;
  restaurants$!: Observable<RestaurantInterface[]>;

  CardTypeEnum = CardTypeEnum;

  private restaurantsService = inject(RestaurantsService);

  ngOnInit() {
    this.restaurants$ = this.restaurantsService.restaurants$;
    this.restaurantsService.getRestaurants().subscribe();
  }

  onToggleFavourite(itemId: string): void {
    this.restaurantsService.toggleFavourite(itemId);
  }
}
