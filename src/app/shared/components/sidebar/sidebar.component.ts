import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { UserLoggedData } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LogoutComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() user?: UserLoggedData;
  @Input() isSidebarOpen?: boolean;
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  menuItems = [
    { label: 'My Orders', icon: 'fa-solid fa-list' },
    { label: 'My Profile', icon: 'fa-solid fa-user' },
    { label: 'Delivery Address', icon: 'fa-solid fa-map-marker-alt' },
    { label: 'Payment Methods', icon: 'fa-solid fa-credit-card' },
    { label: 'Contact Us', icon: 'fa-solid fa-envelope' },
    { label: 'Settings', icon: 'fa-solid fa-cog' },
    { label: 'Helps & FAQs', icon: 'fa-solid fa-question-circle' },
  ];
}
