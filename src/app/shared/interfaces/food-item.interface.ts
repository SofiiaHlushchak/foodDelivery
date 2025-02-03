export interface FoodItemInterface {
  id: string;
  name: string;
  description: string;
  price?: number;
  rating?: number;
  imgUrl?: string;
  feedbacks?: number;
  isFavourite?: boolean;
  ingredients?: [string];
  addons: {
    name: string;
    price: number;
    countable: boolean;
  }[];
  restaurantId: string;
}
