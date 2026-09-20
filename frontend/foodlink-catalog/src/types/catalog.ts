import type { Restaurant } from './restaurant';
import type { Category } from './category';
import type { Flavor, Product } from './product';
export interface CatalogData {
  restaurant: Restaurant;
  categories: Category[];
  products: Product[];
}

export interface CartItem {
  key: string;
  product: Product;
  flavor?: Flavor;
  quantity: number;
}
