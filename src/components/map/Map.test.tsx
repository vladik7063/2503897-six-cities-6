import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import Map from './Map';
import { Offer } from '../../types';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
    marker: vi.fn(() => ({
      addTo: vi.fn(),
      remove: vi.fn(),
    })),
    icon: vi.fn(() => ({})),
  },
}));

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Beautiful apartment',
    type: 'apartment',
    price: 120,
    rating: 4.5,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
    },
    location: { latitude: 52.3909553943508, longitude: 4.85309666406198 },
    isPremium: true,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Nice flat',
    type: 'apartment',
    price: 80,
    rating: 4.0,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
    },
    location: { latitude: 52.369553943508, longitude: 4.85309666406198 },
    isPremium: false,
    isFavorite: true,
  },
];

const mockCity = {
  name: 'Amsterdam',
  location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
};

describe('Map Component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Map offers={mockOffers} city={mockCity} />
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render with activeOfferId', () => {
    const { container } = render(
      <Map offers={mockOffers} city={mockCity} activeOfferId="1" />
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should render with empty offers', () => {
    const { container } = render(
      <Map offers={[]} city={mockCity} />
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should have 100% height style', () => {
    const { container } = render(
      <Map offers={mockOffers} city={mockCity} />
    );

    const mapDiv = container.querySelector('div');
    expect(mapDiv).toHaveStyle({ height: '100%' });
  });
});
