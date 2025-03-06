export interface FoodItemInterface {
  _id?: object;
  id: string;
  name: string;
  description: string;
  price?: number;
  rating?: number;
  imgUrl?: string;
  feedbacks?: number;
  isFavourite?: boolean;
  ingredients?: [string];
  addons: AddonInterface[];
  restaurantId: string;
}

export interface AddonInterface {
  name: string;
  price: number;
  countable: boolean;
}
