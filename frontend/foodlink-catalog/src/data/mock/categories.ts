import type { Category } from '../../types/category';

export const mockCategories: Category[] = [
  {
    id: 'assados',
    name: 'Assados',
    emoji: '🍗',
    description: 'Inteiro e meio frango',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: 'combos',
    name: 'Combos',
    emoji: '⭐',
    description: 'Com maionese e farofa',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: 'pizzas',
    name: 'Pizzas',
    emoji: '🍕',
    description: 'Brotinho individual',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: 'xinecas',
    name: 'Xinecas',
    emoji: '🥟',
    description: 'Bandeja com 4 unidades',
    displayOrder: 4,
    isActive: true,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    emoji: '🥤',
    description: 'Refrescantes',
    displayOrder: 5,
    isActive: true,
  },
];
