import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from './main-page';
import { offersReducer, userReducer, favoritesReducer } from '../../store/slices';
import { AuthorizationStatus, Offer } from '../../types';

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
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
    },
    location: { latitude: 48.8566, longitude: 2.3522 },
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
      name: 'Paris',
      location: { latitude: 48.85661, longitude: 2.351499, zoom: 12 },
    },
    location: { latitude: 48.8576, longitude: 2.3532 },
    isPremium: false,
    isFavorite: true,
  },
];

const createMockStore = (offers: Offer[] = mockOffers, city = 'Paris') =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      offers: {
        city,
        offers,
        isOffersLoading: false,
      },
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      favorites: {
        favorites: [],
        isFavoritesLoading: false,
      },
    },
  });

describe('MainPage Component', () => {
  it('should render correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });

  it('should render city tabs', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should render offers count', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/2 places to stay in Paris/i)).toBeInTheDocument();
  });

  it('should render empty state when no offers', () => {
    const store = createMockStore([], 'Paris');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render sort options', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should render place cards', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('Nice flat')).toBeInTheDocument();
  });
});
