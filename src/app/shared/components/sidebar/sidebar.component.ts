import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LogoutComponent } from '../logout/logout.component';
import { UserLoggedData } from '../../interfaces/auth.interface';
import { ROUTES } from '../../constants/routes.constants';
import { RouterModule } from '@angular/router';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, LogoutComponent, RouterModule, UserInfoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() user: UserLoggedData | null = null;
  @Input() isSidebarOpen?: boolean;
  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  menuItems = [
    { label: 'My Orders', icon: 'fa-solid fa-list', href: '/' },
    {
      label: 'My Profile',
      icon: 'fa-solid fa-user',
      href: `${ROUTES.PROFILE}`,
    },
    {
      label: 'Delivery Address',
      icon: 'fa-solid fa-map-marker-alt',
      href: '/',
    },
    { label: 'Payment Methods', icon: 'fa-solid fa-credit-card', href: '/' },
    { label: 'Contact Us', icon: 'fa-solid fa-envelope', href: '/' },
    { label: 'Settings', icon: 'fa-solid fa-cog', href: '/' },
    { label: 'Helps & FAQs', icon: 'fa-solid fa-question-circle', href: '/' },
  ];
}
