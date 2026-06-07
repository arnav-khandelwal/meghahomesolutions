export interface Property {
  id: string;
  title: string;
  status: 'sale' | 'rent';
  price: number;
  priceUnit: string;
  area: number;
  areaUnit: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featured?: boolean;
  description?: string;
  amenities?: string[];
}

export const properties: Property[] = [
  {
    id: '4',
    title: '2 BHK in Greater Noida',
    status: 'rent',
    price: 23000,
    priceUnit: '₹',
    area: 1233,
    areaUnit: 'sq.ft',
    address: 'J.M. Florence, Greater Noida',
    city: 'Greater Noida',
    bedrooms: 2+1,
    bathrooms: 2,
    images: [
      '/assets/property/property4-1.jpg',
      '/assets/property/property4-2.jpg',
      '/assets/property/property4-3.jpg',
      '/assets/property/property4-4.jpg',
      '/assets/property/property4-5.jpg',
      '/assets/property/property4-6.jpg',
      '/assets/property/property4-7.jpg',
    ],
    featured: false,
    description: 'Corner flat with great view. Good connectivity with Noida-Greater Noida expressway. Good schools nearby.',
    amenities: ['Parking', 'Security', 'Power Backup', 'Swimming Pool', 'Gym', 'Club House', 'Basketball court', 'Tennis court', 'Park', 'Children\'s play area'],
  },
];
