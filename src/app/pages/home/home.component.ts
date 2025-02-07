import { Component, inject, OnInit } from '@angular/core';
import { RestaurantsService } from '../../services/restaurants.service';
import { Observable } from 'rxjs';
import { CardTypeEnum } from '../../shared/enums/card-type.enum';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PrimaryCardComponent } from '../../shared/components/primary-card/primary-card.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { RestaurantInterface } from '../../shared/interfaces/restaurant.interface';
import { AuthService } from '../../services/auth.service';
import { ROUTES } from '../../shared/constants/routes.constants';

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
  restaurants$!: Observable<RestaurantInterface[]>;

  CardTypeEnum = CardTypeEnum;

  private restaurantsService = inject(RestaurantsService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.restaurants$ = this.restaurantsService.restaurants$;
    this.restaurantsService.getRestaurants().subscribe();
  }

  onToggleFavourite(itemId: string): void {
    this.restaurantsService.toggleFavourite(itemId);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate([`${ROUTES.LOG_IN}`]);
  }
}
