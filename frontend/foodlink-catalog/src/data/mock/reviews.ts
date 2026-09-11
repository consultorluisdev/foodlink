import type { Review } from '../../types/review';

export const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Gabriela Martins',
    avatar: '👩🏻',
    rating: 5,
    text: 'O frango assado é simplesmente o melhor da região! Tempero perfeito e a farofa especial é DIVINA. Chegou rapidinho.',
    date: 'há 2 dias',
  },
  {
    id: '2',
    author: 'Carlos Eduardo',
    avatar: '👨🏽',
    rating: 5,
    text: 'Pedimos o Combo Família para o domingo e rendeu demais. Batata com cheddar viciante e a pizza de frango com catupiry é absurda.',
    date: 'há 1 semana',
  },
  {
    id: '3',
    author: 'Fernanda Lima',
    avatar: '👩🏾',
    rating: 4,
    text: 'Atendimento pelo WhatsApp foi super rápido e o pedido chegou quentinho. A maionese da casa é o segredo deles, recomendo!',
    date: 'há 2 semanas',
  },
];