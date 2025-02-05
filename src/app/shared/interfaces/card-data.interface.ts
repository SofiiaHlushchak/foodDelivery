import { CardTypeEnum } from '../enums/card-type.enum';
import { FoodItemInterface } from './food-item.interface';
import { RestaurantInterface } from './restaurant.interface';

export interface CardDataInterface {
  type: CardTypeEnum;
  data: RestaurantInterface | FoodItemInterface;
}
