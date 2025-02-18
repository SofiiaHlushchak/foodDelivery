import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from '../../constants/routes.constants';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private router = inject(Router);
  private cartService = inject(CartService);

  ROUTES = ROUTES;

  get totalQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}
