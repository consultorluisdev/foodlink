import { useEffect, useState } from 'react';
import { CatalogData } from '../types/catalog';
import {
  mockRestaurant,
  mockCategories,
  mockProducts,
} from '../data/mock';

export const useCatalog = () => {
  const [catalog, setCatalog] = useState<CatalogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        // Simula uma futura chamada à API
        await new Promise((resolve) => setTimeout(resolve, 500));

        setCatalog({
          restaurant: mockRestaurant,
          categories: mockCategories,
          products: mockProducts,
        });
      } finally {
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
