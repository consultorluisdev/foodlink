import type { Restaurant } from './restaurant';
import type { Category } from './category';
import type { Product } from './product';

export interface CatalogData {
  restaurant: Restaurant;
  categories: Category[];
  products: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
