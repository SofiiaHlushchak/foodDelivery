import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouteConfigData } from '../../interfaces/route-config-data.interface';
import { CartService } from '../../../services/cart.service';
import { UserLoggedData } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() user: UserLoggedData | null = null;
  @Input() headerConfig!: RouteConfigData;
  @Input() isRestaurantFavourite?: boolean;
  @Input() isDishFavourite?: boolean;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() favouriteStatusChanged = new EventEmitter<void>();

  public location = inject(Location);
  private cartService = inject(CartService);

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleFavourite() {
    this.favouriteStatusChanged.emit();
  }
}
