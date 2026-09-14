export interface Flavor {
  name: string;
  price: number;
}

export interface Flavor {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  sabor: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  emoji?: string;
  categoryId: string;
  size?: string;
  ingredients?: string[];
  flavors?: Flavor[];
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}
