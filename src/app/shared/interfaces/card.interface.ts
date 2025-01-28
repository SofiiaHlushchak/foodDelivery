export interface CardInterface {
  id: number;
  name: string;
  imageUrl: string;
  rating?: number;
  reviews: number;
  price?: number;
  ingredients?: string;
  isDeliveryFree?: boolean;
  deliveryCost?: number;
  deliveryTime?: string;
  isFavorite?: boolean;
  categories?: string[];
}
