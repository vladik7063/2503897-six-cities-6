import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '101',
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 5,
    comment: 'Fantastic location and very clean apartment. Everything needed for a short stay.',
    date: '2025-09-12',
  },
  {
    id: '102',
    user: {
      name: 'Sophie',
      avatarUrl: 'img/avatar-angelina.jpg',
    },
    rating: 4,
    comment: 'Nice place with good transport access. Slightly noisy in the evenings.',
    date: '2025-10-03',
  },
  {
    id: '103',
    user: {
      name: 'Daniel',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 3,
    comment: 'The apartment is okay, but furniture looks a bit worn.',
    date: '2025-11-20',
  },
];
