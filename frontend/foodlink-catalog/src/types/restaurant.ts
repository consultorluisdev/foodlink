export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  coverUrl: string;
  description: string;
  phone: string;
  address: string;
  instagram: string;
  whatsapp: string;
  whatsappSandra?: string;
  tagline?: string;
  hours?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
}
export interface RestaurantTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}
