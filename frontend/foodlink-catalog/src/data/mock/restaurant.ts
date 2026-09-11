import type { Restaurant } from '../../types/restaurant';

export const mockRestaurant: Restaurant = {
  id: '1',
  name: 'Foodlink',
  slug: 'foodlink',
  logoUrl: '/images/frango1.jpeg',
  coverUrl: '/images/frango1.jpeg',
  description: 'Frango assado, maionese e farofa do jeito da casa.',
  tagline: 'do jeito da casa',
  phone: '(47) 99287-2163',
  address: 'Rua Hercílio Luz, 325 - Brusque, SC',
  instagram: '@foodlink',
  whatsapp: '5547992872163',
  whatsappSandra: '5547996139382',
  hours: 'Sábados: 18h às 23h',
  theme: {
    primaryColor: '#d9a441',
    secondaryColor: '#17130f',
    accentColor: '#b37b22',
    backgroundColor: '#0d0b08',
    textColor: '#f6efe1',
  },
};