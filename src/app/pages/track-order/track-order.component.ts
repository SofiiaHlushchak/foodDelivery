import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleMapComponent } from '../../shared/components/google-map/google-map.component';
import { Order } from '../../shared/interfaces/order.interface';
import { OrderStatus } from '../../shared/enums/order-status.enum';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserLoggedData } from '../../shared/interfaces/auth.interface';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-track-order',
  imports: [GoogleMapComponent, CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss',
})
export class TrackOrderComponent implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  OrderStatus = OrderStatus;

  user$: Observable<UserLoggedData | null> = this.authService.userSubject$;

  distance?: number;
  user: UserLoggedData | null = null;

  order!: Order;
  statusUpdatedAt: Record<string, string> = {};

  statuses: string[] = [
    OrderStatus.Pending,
    OrderStatus.Confirmed,
    OrderStatus.Shipped,
    OrderStatus.Delivered,
  ];

  statusesText: Record<OrderStatus, string> = {
    [OrderStatus.Pending]: 'Awaiting Confirmation',
    [OrderStatus.Confirmed]: 'Order Confirmed',
    [OrderStatus.Shipped]: 'Food on the way',
    [OrderStatus.Delivered]: 'Delivered to you',
    [OrderStatus.Cancelled]: 'Order Cancelled',
  };

  ngOnInit(): void {
    this.order = this.route.snapshot.data['order'];

    this.user$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => (this.user = user));
  }

  get activeStatusIndex(): number {
    return this.statuses.findIndex(status => status === this.order.status);
  }

  getStatusText(status: string): string {
    const statusEnum = status as OrderStatus;
    return this.statusesText[statusEnum];
  }

  updateDistance(newDistance: number) {
    this.distance = Math.round(newDistance);
  }

  updateOrderStatus(orderStatus: { status: OrderStatus; updatedAt: string }) {
    this.order.status = orderStatus.status;
    this.statusUpdatedAt[orderStatus.status] = orderStatus.updatedAt;
  }
}
