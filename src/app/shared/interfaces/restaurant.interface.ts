import { FoodItemInterface } from './food-item.interface';

export interface RestaurantInterface {
  id: string;
  name: string;
  imgUrl?: string;
  logoUrl?: string;
  rating?: number;
  feedbacks?: number;
  delivery: {
    cost?: number;
    time?: number;
  };
  isFavourite?: boolean;
  categories?: string[];
  verified?: boolean;
  foodItems?: FoodItemInterface[];
}
