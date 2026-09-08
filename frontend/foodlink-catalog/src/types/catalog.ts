import { Restaurant } from './restaurant';
import { Category } from './category';
import { Product } from './product';

export interface CatalogData {
  restaurant: Restaurant;
  categories: Category[];
  products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
