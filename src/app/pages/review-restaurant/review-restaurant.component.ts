import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../shared/interfaces/order.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { RestaurantsService } from '../../services/restaurants.service';
import { ROUTES } from '../../shared/constants/routes.constants';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-review-restaurant',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './review-restaurant.component.html',
  styleUrl: './review-restaurant.component.scss',
})
export class ReviewRestaurantComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private restaurantService = inject(RestaurantsService);
  private notificationService = inject(NotificationService);

  order!: Order;
  reviewForm!: FormGroup;

  get restaurant() {
    return this.order.restaurant;
  }

  get rating(): number {
    return this.reviewForm.get('rating')?.value;
  }

  ngOnInit(): void {
    this.order = this.route.snapshot.data['order'];

    this.reviewForm = this.fb.group({
      rating: new FormControl(0),
    });
  }

  getRatingInfo(rating: number): { text: string; color: string } {
    switch (rating) {
      case 1:
        return { text: 'Very Bad', color: '#FF4C4C' };
      case 2:
        return { text: 'Bad', color: '#FE724C' };
      case 3:
        return { text: 'Average', color: '#FFC529' };
      case 4:
        return { text: 'Good', color: '#90EE90' };
      case 5:
        return { text: 'Excellent', color: '#006400' };
      default:
        return { text: '', color: 'gray' };
    }
  }

  submitReview(): void {
    const restaurantId = this.order.restaurant?.id;

    if (restaurantId) {
      const rating = this.reviewForm.value.rating;

      this.restaurantService.updateRating(restaurantId, rating).subscribe({
        next: () => {
          this.notificationService.showMessage('Thank you for your review!');
          this.router.navigate([ROUTES.ORDERS]);
        },
        error: err => {
          console.error('Error updating rating:', err);
        },
      });
    } else {
      console.error('Restaurant ID is missing');
    }
  }
}
