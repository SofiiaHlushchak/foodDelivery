import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';
import { Order } from '../shared/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<Order> {
  private orderService = inject(OrderService);

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    const orderId = route.paramMap.get('id');

    return this.orderService.getOrderById(orderId!);
  }
}
