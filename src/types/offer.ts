export type Location = {
  latitude: number;
  longitude: number;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;

  title: string;
  description: string;

  type: string;
  city: string;

  price: number;
  rating: number;

  isPremium: boolean;
  isFavorite: boolean;

  previewImage: string;
  images: string[];

  bedrooms: number;
  maxAdults: number;

  goods: string[];
  host: Host;
  location: Location;
};
