import { Component, Input } from '@angular/core';
import { Order } from '../../interfaces/order.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css'],
})
export class OrderCardComponent {
  @Input() order!: Order;
  @Input() orderType!: 'upcoming' | 'history';

  getFoodImageUrl(order: Order): string {
    return order.foodItems.length > 0 && order.foodItems[0].dish.imgUrl
      ? order.foodItems[0].dish.imgUrl
      : 'path_to_default_image.jpg';
  }

  getStatusText(status?: string): string {
    switch (status) {
      case 'pending':
        return 'Awaiting Confirmation';
      case 'confirmed':
        return 'Order Confirmed';
      case 'shipped':
        return 'Food on the way';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown status';
    }
  }

  getStatusClass(status?: string): string {
    switch (status) {
      case 'pending':
      case 'confirmed':
      case 'shipped':
        return 'text-secondary';
      case 'delivered':
        return 'text-green-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}
