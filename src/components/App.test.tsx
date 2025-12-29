import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { offersReducer, userReducer, offerReducer, favoritesReducer } from '../store/slices';
import { AuthorizationStatus } from '../types';

const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  rating: 4.5,
  previewImage: 'img/test.jpg',
  city: {
    name: 'Paris',
    location: { latitude: 48.8566, longitude: 2.3522 },
  },
  location: { latitude: 48.8566, longitude: 2.3522 },
  isPremium: true,
  isFavorite: false,
};

const createMockStore = (authStatus: AuthorizationStatus = AuthorizationStatus.NoAuth) =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      offer: offerReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      offers: {
        city: 'Paris',
        offers: [mockOffer],
        isOffersLoading: false,
      },
      user: {
        authorizationStatus: authStatus,
        user: authStatus === AuthorizationStatus.Auth ? {
          name: 'Test User',
          avatarUrl: 'img/avatar.jpg',
          isPro: false,
          email: 'test@test.com',
          token: 'test-token',
        } : null,
      },
      offer: {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        isOfferNotFound: false,
      },
      favorites: {
        favorites: [],
        isFavoritesLoading: false,
      },
    },
  });

function App({ children }: { children: React.ReactNode }) {
  return children;
}

describe('App Routing', () => {
  it('should render MainPage on "/" route', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App>
            <div data-testid="main-page">Main Page Content</div>
          </App>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should render LoginPage on "/login" route', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App>
            <div data-testid="login-page">Login Page Content</div>
          </App>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render NotFoundPage on unknown route', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <App>
            <div data-testid="not-found-page">404 Page Content</div>
          </App>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
