import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesPage from './favorites-page';
import { userReducer, favoritesReducer } from '../../store/slices';
import { AuthorizationStatus, Offer } from '../../types';

const createMockStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          name: 'Test User',
          avatarUrl: 'img/avatar.jpg',
          isPro: false,
          email: 'test@test.com',
          token: 'test-token',
        },
      },
      favorites: {
        favorites: [],
        isFavoritesLoading: false,
      },
    },
  });

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Nice apartment in Paris',
    type: 'apartment',
    price: 100,
    rating: 4.5,
    previewImage: 'img/test1.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522 },
    },
    location: { latitude: 48.8566, longitude: 2.3522 },
    isPremium: true,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Cozy place in Amsterdam',
    type: 'room',
    price: 80,
    rating: 4.0,
    previewImage: 'img/test2.jpg',
    city: {
      name: 'Amsterdam',
      location: { latitude: 52.3676, longitude: 4.9041 },
    },
    location: { latitude: 52.3676, longitude: 4.9041 },
    isPremium: false,
    isFavorite: true,
  },
];

describe('FavoritesPage Component', () => {
  it('should render empty state when no offers', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render offers grouped by city', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should render offer cards', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nice apartment in Paris')).toBeInTheDocument();
    expect(screen.getByText('Cozy place in Amsterdam')).toBeInTheDocument();
  });

  it('should render footer with logo', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const footerLogo = screen.getAllByAltText('6 cities logo')[1];
    expect(footerLogo).toBeInTheDocument();
  });

  it('should have correct page class when empty', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page--favorites-empty')).toBeInTheDocument();
  });

  it('should not have empty class when offers exist', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.page--favorites-empty')).not.toBeInTheDocument();
  });
});
