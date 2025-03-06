import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../shared/interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';
import { OrderStatus } from '../../shared/enums/order-status.enum';
import { OrderType } from '../../shared/enums/order-type.enum';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, OrderCardComponent],
  templateUrl: './orders.component.html',
  styles: [
    `
      :host {
        flex: 1;
        margin-top: 100px;
      }
    `,
  ],
})
export class OrdersComponent implements OnInit {
  private route = inject(ActivatedRoute);
  upcomingOrders: Order[] = [];
  historyOrders: Order[] = [];
  activeTab: OrderType = OrderType.Upcoming;

  OrderType = OrderType;

  ngOnInit(): void {
    const orders = this.route.snapshot.data['orders'];
    if (orders) {
      const sortedOrders = orders.sort(
        (a: Order, b: Order) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );

      this.upcomingOrders = sortedOrders.filter(
        (order: Order) =>
          order.status === OrderStatus.Pending ||
          order.status === OrderStatus.Confirmed ||
          order.status === OrderStatus.Shipped
      );
      this.historyOrders = sortedOrders.filter(
        (order: Order) =>
          order.status === OrderStatus.Delivered ||
          order.status === OrderStatus.Cancelled
      );
    }
  }

  switchTab(tab: OrderType): void {
    this.activeTab = tab;
  }
}
