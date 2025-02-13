import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouteConfigData } from '../../interfaces/route-config-data.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule],
})
export class HeaderComponent {
  @Input() headerConfig!: RouteConfigData;
  @Input() isRestaurantFavourite?: boolean;
  @Output() sidebarToggle = new EventEmitter<void>();
  @Output() favouriteStatusChanged = new EventEmitter<void>();

  public location = inject(Location);

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleFavourite() {
    this.favouriteStatusChanged.emit();
  }
}
