import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'Comfortable apartment in a quiet area',
    description: 'A bright apartment suitable for short and long stays.',

    type: 'apartment',
    city: 'Paris',

    price: 150,
    rating: 4.6,

    isPremium: true,
    isFavorite: true,

    previewImage: 'img/apartment-01.jpg',
    images: [
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
    ],

    bedrooms: 2,
    maxAdults: 4,

    goods: ['Wi-Fi', 'Kitchen', 'Heating'],
    host: {
      name: 'Alex',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
  },
  {
    id: 'o2',
    title: 'Simple room near city transport',
    description: 'Good option for travelers who spend little time at home.',

    type: 'room',
    city: 'Amsterdam',

    price: 65,
    rating: 4.1,

    isPremium: false,
    isFavorite: false,

    previewImage: 'img/room.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-02.jpg',
    ],

    bedrooms: 1,
    maxAdults: 1,

    goods: ['Wi-Fi'],
    host: {
      name: 'Maria',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },
  },
  {
    id: 'o3',
    title: 'Spacious house with private garden',
    description: 'Perfect for families who value space and privacy.',

    type: 'house',
    city: 'Cologne',

    price: 240,
    rating: 4.8,

    isPremium: true,
    isFavorite: false,

    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
    ],

    bedrooms: 4,
    maxAdults: 6,

    goods: ['Parking', 'Washer', 'Kitchen'],
    host: {
      name: 'Thomas',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
  },
  {
    id: 'o4',
    title: 'Hotel room with city view',
    description: 'Comfortable hotel room close to the main attractions.',

    type: 'hotel',
    city: 'Brussels',

    price: 200,
    rating: 5,

    isPremium: false,
    isFavorite: true,

    previewImage: 'img/room.jpg',
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],

    bedrooms: 1,
    maxAdults: 2,

    goods: ['Breakfast', 'Air conditioning'],
    host: {
      name: 'Hotel manager',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
  },
];
