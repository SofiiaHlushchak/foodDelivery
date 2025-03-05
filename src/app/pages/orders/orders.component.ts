import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/interfaces/order.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from '../../shared/components/order-card/order-card.component';

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
  private orderService = inject(OrderService);
  upcomingOrders: Order[] = [];
  historyOrders: Order[] = [];
  activeTab: 'upcoming' | 'history' = 'upcoming';
  orders$: Observable<Order[] | null> = this.orderService.orders$;

  ngOnInit(): void {
    this.orderService.getCachedUserOrders().subscribe();
    this.loadOrders();
  }

  loadOrders(): void {
    this.orders$.subscribe(orders => {
      if (orders) {
        const sortedOrders = orders.sort(
          (a, b) =>
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        );

        this.upcomingOrders = sortedOrders.filter(
          order =>
            order.status === 'pending' ||
            order.status === 'confirmed' ||
            order.status === 'shipped'
        );
        this.historyOrders = sortedOrders.filter(
          order => order.status === 'delivered' || order.status === 'cancelled'
        );
      }
    });
  }

  switchTab(tab: 'upcoming' | 'history'): void {
    this.activeTab = tab;
  }
}
