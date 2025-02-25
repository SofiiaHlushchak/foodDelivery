import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../shared/components/header/header.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouteConfigData } from '../shared/interfaces/route-config-data.interface';
import { Observable, Subscription } from 'rxjs';
import { RestaurantInterface } from '../shared/interfaces/restaurant.interface';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { UserLoggedData } from '../shared/interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    FooterComponent,
  ],
  templateUrl: './layout.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  private routeSubscription: Subscription = new Subscription();

  private restaurant?: RestaurantInterface;
  user$: Observable<UserLoggedData | null> = this.authService.getCachedUser();

  layoutConfig!: RouteConfigData;
  isSidebarOpen = false;
  isRestaurantFavourite?: boolean;

  ngOnInit(): void {
    this.subscribeToRouterEvents();
  }

  subscribeToRouterEvents(): void {
    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setLayoutConfig();
      });

    this.setLayoutConfig();
  }

  setLayoutConfig(): void {
    const route = this.getDeepestRoute(this.route);
    const routeData = route.snapshot.data;
    const { restaurant } = routeData || {};

    this.restaurant = restaurant;
    this.isRestaurantFavourite = this.restaurant?.['isFavourite'];
    this.layoutConfig = { ...routeData };
  }

  toggleFavourite(): void {
    this.isRestaurantFavourite = !this.isRestaurantFavourite;
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private getDeepestRoute(route: ActivatedRoute): ActivatedRoute {
    return route.firstChild ? this.getDeepestRoute(route.firstChild) : route;
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
