import { Component, Input } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { CommonModule } from '@angular/common';
import { OrderType } from '../../enums/order-type.enum';
import { OrderStatus } from '../../enums/order-status.enum';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() orderType!: OrderType;

  OrderType = OrderType;

  getFoodImageUrl(order: Order): string {
    return order.foodItems.length > 0 && order.foodItems[0].dish.imgUrl
      ? order.foodItems[0].dish.imgUrl
      : 'path_to_default_image.jpg';
  }

  getStatusText(status?: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
        return 'Awaiting Confirmation';
      case OrderStatus.Confirmed:
        return 'Order Confirmed';
      case OrderStatus.Shipped:
        return 'Food on the way';
      case OrderStatus.Delivered:
        return 'Delivered';
      case OrderStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown status';
    }
  }

  getStatusClass(status?: OrderStatus): string {
    switch (status) {
      case OrderStatus.Pending:
      case OrderStatus.Confirmed:
      case OrderStatus.Shipped:
        return 'text-secondary';
      case OrderStatus.Delivered:
        return 'text-green-500';
      case OrderStatus.Cancelled:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}
