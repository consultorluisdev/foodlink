import { useEffect, useState } from 'react';
import type { CatalogData } from '../types/catalog';
import {
  mockRestaurant,
  mockCategories,
  mockProducts,
} from '../data/mock';

interface ApiCategory {
  id: string | number;
  name: string;
  description?: string | null;
  isActive: boolean;
}

interface ApiProduct {
  id: string | number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  categoryId: string | number;
  isActive: boolean;
}

const adaptCategory = (api: ApiCategory) => ({
  id: String(api.id),
  name: api.name,
  description: api.description || '',
  emoji: undefined,
  displayOrder: 0,
  isActive: api.isActive,
});

const adaptProduct = (api: ApiProduct) => ({
  id: String(api.id),
  name: api.name,
  description: api.description || '',
  price: api.price,
  imageUrl: api.imageUrl || '/images/placeholder.jpeg',
  categoryId: String(api.categoryId),
  available: api.isActive,
  emoji: undefined,
  size: undefined,
  ingredients: [],
  flavors: [],
});

export const useCatalog = () => {
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        // Simula uma futura chamada à API // buscar dados da API
        const apiBase = import.meta.env.VITE_API_URL;

        // buscar da api
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(`${apiBase}/categories`),
          fetch(`${apiBase}/products?active=true`),
        ]);
        if(!categoriesRes.ok || !productsRes.ok) {
          throw new Error('API indisponivel');
        }

        const categories = await categoriesRes.json();
        const products = await productsRes.json();
        // adaptar e usar dados da API
        setCatalog({
          restaurant: mockRestaurant, 
          categories: categories.map(adaptCategory),
          products: products.map(adaptProduct),
        });
      } catch {
        setCatalog({
          restaurant: mockRestaurant,
          categories: mockCategories,
          products: mockProducts,
        });
      }finally {
        setLoading(false);
      }
    };

    loadCatalog();
  }, []);

  return {
    catalog,
    loading,
  };
};
