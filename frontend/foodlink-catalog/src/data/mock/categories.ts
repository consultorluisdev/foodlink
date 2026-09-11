import type { Category } from '../../types/category';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Tradicionais',
    description: 'Nossos clássicos que nunca saem de moda',
    displayOrder: 1,
    isActive: true,
  },
  {
    id: '2',
    name: 'Especiais',
    description: 'Criações exclusivas da casa',
    displayOrder: 2,
    isActive: true,
  },
  {
    id: '3',
    name: 'Acompanhamentos',
    description: 'Para completar sua refeição',
    displayOrder: 3,
    isActive: true,
  },
  {
    id: '4',
    name: 'Bebidas',
    description: 'Refresque-se com nossas opções',
    displayOrder: 4,
    isActive: true,
  },
];
