export interface RestaurantCardInterface {
  name: string;
  rating: number;
  reviews: number;
  isDeliveryFree?: boolean;
  deliveryCost?: number;
  deliveryTime?: string;
  isFavorite?: boolean;
  categories?: string[];
}
