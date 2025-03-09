import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';
import { OrderService } from '../services/order.service';
import { OrderStatus } from '../shared/enums/order-status.enum';
import { ROUTES } from '../shared/constants/routes.constants';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class OrderStatusGuard implements CanActivate {
  private router = inject(Router);
  private orderService = inject(OrderService);
  private notificationService = inject(NotificationService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const orderId = route.paramMap.get('id');

    if (!orderId) {
      this.notificationService.showMessage("You can't track this order.");
      this.router.navigate([ROUTES.ORDERS]);
      return of(false);
    }

    return this.orderService.getOrderById(orderId).pipe(
      map(order => {
        if (order && order.status === OrderStatus.Delivered) {
          this.notificationService.showMessage(
            "You can't track this order because it has already been delivered."
          );
          this.router.navigate([ROUTES.ORDERS]);
          return false;
        }
        return true;
      })
    );
  }
}
