export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type AuthData = {
  email: string;
  password: string;
};

export type Review = {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom?: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl?: string;
  isPro: boolean;
};

export type CommentData = {
  offerId: string;
  comment: string;
  rating: number;
};

export type Offer = {
  id: string;

  title: string;
  description?: string;

  type: string;
  city: City;

  price: number;
  rating: number;

  isPremium: boolean;
  isFavorite: boolean;

  previewImage: string;
  images?: string[];

  bedrooms?: number;
  maxAdults?: number;

  goods?: string[];
  host?: Host;
  location: Location;
};
