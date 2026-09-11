import type { Restaurant } from '../../types/restaurant';

export const mockRestaurant: Restaurant = {
  id: '1',
  name: 'Garagem do Frango',
  slug: 'garagem-do-frango',
  logoUrl: '/images/logo.png',
  coverUrl: '/images/hero-bg.jpg',
  description: 'A melhor comida da cidade, feita com amor e ingredientes frescos.',
  phone: '(47) 99999-9999',
  address: 'Rua das Pizzas, 123 - Centro',
  instagram: '@garagemdofrango',
  whatsapp: '5547999999999',
  theme: {
    primaryColor: '#F97316',
    secondaryColor: '#1F2937',
    accentColor: '#DC2626',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
};
