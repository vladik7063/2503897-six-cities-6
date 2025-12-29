import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OfferPage from './offer-page';
import { AuthorizationStatus, Offer, Review } from '../../types';

vi.mock('../../store/api-actions', () => ({
  fetchOfferAction: () => ({ type: 'mock/fetchOffer' }),
  fetchNearbyOffersAction: () => ({ type: 'mock/fetchNearby' }),
  fetchCommentsAction: () => ({ type: 'mock/fetchComments' }),
  toggleFavoriteAction: () => ({ type: 'mock/toggleFavorite' }),
}));

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

const createMockOffersSlice = () => ({
  city: 'Amsterdam',
  offers: [],
  isOffersLoading: false,
});

const createMockUserSlice = (authStatus: AuthorizationStatus, user = null) => ({
  authorizationStatus: authStatus,
  user,
});

const createMockOfferSlice = (
  currentOffer: Offer | null,
  nearbyOffers: Offer[],
  comments: Review[],
  isLoading: boolean,
  isNotFound: boolean
) => ({
  currentOffer,
  nearbyOffers,
  comments,
  isOfferLoading: isLoading,
  isOfferNotFound: isNotFound,
});

const createMockFavoritesSlice = () => ({
  favorites: [],
  isFavoritesLoading: false,
});

const mockOffer: Offer = {
  id: '1',
  title: 'Beautiful apartment',
  type: 'apartment',
  price: 120,
  rating: 4.5,
  previewImage: 'img/apartment-01.jpg',
  images: ['img/apartment-01.jpg', 'img/apartment-02.jpg'],
  city: {
    name: 'Amsterdam',
    location: { latitude: 52.37454, longitude: 4.897976, zoom: 12 },
  },
  location: { latitude: 52.3909553943508, longitude: 4.85309666406198 },
  isPremium: true,
  isFavorite: false,
  bedrooms: 3,
  maxAdults: 4,
  goods: ['Wifi', 'Heating', 'Kitchen'],
  host: {
    name: 'Angelina',
    avatarUrl: 'img/avatar-angelina.jpg',
    isPro: true,
  },
  description: 'A quiet cozy and picturesque apartment.',
};

const mockNearbyOffers: Offer[] = [
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

const mockComments: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment: 'Great place!',
    date: '2024-04-15',
  },
];

const createMockStore = (
  authStatus: AuthorizationStatus = AuthorizationStatus.NoAuth,
  currentOffer: Offer | null = mockOffer,
  isLoading = false,
  isNotFound = false
) => {
  const initialState = {
    offers: createMockOffersSlice(),
    user: createMockUserSlice(
      authStatus,
    ),
    offer: createMockOfferSlice(currentOffer, mockNearbyOffers, mockComments, isLoading, isNotFound),
    favorites: createMockFavoritesSlice(),
  };

  return configureStore({
    reducer: {
      offers: (state: typeof initialState.offers = initialState.offers) => state,
      user: (state: typeof initialState.user = initialState.user) => state,
      offer: (state: typeof initialState.offer = initialState.offer) => state,
      favorites: (state: typeof initialState.favorites = initialState.favorites) => state,
    },
    preloadedState: initialState,
  });
};

describe('OfferPage Component', () => {
  it('should render correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
  });

  it('should render offer details', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('apartment').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/€120/)).toBeInTheDocument();
    expect(screen.getByText('3 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 4 adults')).toBeInTheDocument();
  });

  it('should render premium badge when offer is premium', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render host information', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    expect(screen.getByText('Angelina')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
  });

  it('should render amenities', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Wifi')).toBeInTheDocument();
    expect(screen.getByText('Heating')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
  });

  it('should render reviews', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Great place!')).toBeInTheDocument();
  });

  it('should render review form for authorized users', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('should not render review form for unauthorized users', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });

  it('should render nearby places', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText('Nice flat')).toBeInTheDocument();
  });

  it('should render spinner when loading', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth, null, true, false);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should redirect to 404 when offer not found', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth, null, false, true);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <Routes>
            <Route path="/offer/:id" element={<OfferPage />} />
            <Route path="/404" element={<div data-testid="not-found">Not Found</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
