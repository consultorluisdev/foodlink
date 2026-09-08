export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number;
  imageUrl: string;
  categoryId: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}
