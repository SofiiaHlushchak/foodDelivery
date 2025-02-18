import { AddonInterface, FoodItemInterface } from './food-item.interface';

export interface CartItemInterface {
  dish: FoodItemInterface;
  quantity: number;
  addons: AddonInterface[];
}
