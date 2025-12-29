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

    location: {
      latitude: 48.857,
      longitude: 2.351,
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

    location: {
      latitude: 52.3705,
      longitude: 4.894,
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

    location: {
      latitude: 50.938,
      longitude: 6.96,
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

    location: {
      latitude: 50.851,
      longitude: 4.352,
    },
  },
  {
    id: 'o5',
    title: 'Stylish apartment near park',
    description: 'Stylish apartment near park.',

    type: 'Apartment',
    city: 'Amsterdam',

    price: 120,
    rating: 4.7,

    isPremium: true,
    isFavorite: true,

    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
    ],

    bedrooms: 5,
    maxAdults: 1,

    goods: ['Wi-Fi'],
    host: {
      name: 'Maria',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: false,
    },

    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
    },
  },
  {
    id: 'o7',
    title: 'Modern apartment with balcony',
    description: 'Modern apartment with a great city view.',

    type: 'apartment',
    city: 'Paris',

    price: 220,
    rating: 4.9,

    isPremium: true,
    isFavorite: false,

    previewImage: 'img/apartment-02.jpg',
    images: [
      'img/apartment-02.jpg',
      'img/apartment-01.jpg',
      'img/apartment-03.jpg',
    ],

    bedrooms: 3,
    maxAdults: 5,

    goods: ['Wi-Fi', 'Kitchen', 'Washer'],
    host: {
      name: 'Jean',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },

    location: {
      latitude: 48.853,
      longitude: 2.349,
    },
  },

  {
    id: 'o8',
    title: 'Budget room near metro',
    description: 'Affordable room close to public transport.',

    type: 'room',
    city: 'Paris',

    price: 60,
    rating: 3.8,

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
      name: 'Lucas',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },

    location: {
      latitude: 48.865,
      longitude: 2.360,
    },
  },

  {
    id: 'o9',
    title: 'Luxury penthouse in city center',
    description: 'Exclusive penthouse for premium stay.',

    type: 'apartment',
    city: 'Paris',

    price: 350,
    rating: 5.0,

    isPremium: true,
    isFavorite: true,

    previewImage: 'img/apartment-03.jpg',
    images: [
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],

    bedrooms: 4,
    maxAdults: 6,

    goods: ['Wi-Fi', 'Kitchen', 'Air conditioning'],
    host: {
      name: 'Claire',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },

    location: {
      latitude: 48.850,
      longitude: 2.355,
    },
  },
];
