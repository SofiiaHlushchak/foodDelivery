import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { Order } from '../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<Order[]> {
  private orderService = inject(OrderService);

  resolve(): Observable<Order[]> {
    return this.orderService.getCachedUserOrders();
  }
}
