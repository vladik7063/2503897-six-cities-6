export const ReviewLength = {
  Min: 50,
  Max: 300,
} as const;

export const Rating = {
  MaxStars: 5,
  PercentPerStar: 20,
} as const;

export const RatingTitles = [
  'terrible',
  'bad',
  'okay',
  'good',
  'excellent',
] as const;


export const OfferConfig = {
  MaxGalleryImages: 6,
  MaxNearbyOffers: 3,
  MaxComments: 10,
} as const;

export const MapConfig = {
  DefaultZoom: 12,
  IconSize: [27, 39] as [number, number],
  IconAnchor: [13.5, 39] as [number, number],
} as const;

export const ApiConfig = {
  BaseUrl: 'https://14.design.htmlacademy.pro/six-cities',
  Timeout: 5000,
} as const;
