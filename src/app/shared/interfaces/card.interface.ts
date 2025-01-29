export interface CardInterface {
  id: string;
  name: string;
  imgUrl?: string;
  rating?: number;
  feedbacks?: number;
  delivery: {
    cost?: number;
    time?: number;
  };
  isFavourite?: boolean;
  categories?: string[];
  verified?: boolean;
  description: string;
  price?: number;
  ingredients?: [string];
  addons: {
    name: string;
    price: number;
    countable: boolean;
  }[];
  restaurantId: string;
}
