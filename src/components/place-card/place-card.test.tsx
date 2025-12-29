import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PlaceCard from './place-card';
import { userReducer, favoritesReducer } from '../../store/slices';
import { AuthorizationStatus, Offer } from '../../types';

const mockOffer: Offer = {
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
};

const createMockStore = (authStatus: AuthorizationStatus = AuthorizationStatus.NoAuth) =>
  configureStore({
    reducer: {
      user: userReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      user: {
        authorizationStatus: authStatus,
        user: null,
      },
      favorites: {
        favorites: [],
        isFavoritesLoading: false,
      },
    },
  });

describe('PlaceCard Component', () => {
  it('should render correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Beautiful apartment')).toBeInTheDocument();
    expect(screen.getByText('apartment')).toBeInTheDocument();
    expect(screen.getByText(/120/)).toBeInTheDocument();
  });

  it('should render premium badge when offer is premium', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium badge when offer is not premium', () => {
    const store = createMockStore();
    const nonPremiumOffer = { ...mockOffer, isPremium: false };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={nonPremiumOffer} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render rating with correct width (rounded)', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const ratingSpan = container.querySelector('.place-card__stars span');
    expect(ratingSpan).toHaveStyle({ width: '100%' });
  });

  it('should call onMouseEnter when hovering over card', () => {
    const store = createMockStore();
    const handleMouseEnter = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} onMouseEnter={handleMouseEnter} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseEnter(card);

    expect(handleMouseEnter).toHaveBeenCalledWith('1');
  });

  it('should call onMouseLeave when mouse leaves card', () => {
    const store = createMockStore();
    const handleMouseLeave = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} onMouseLeave={handleMouseLeave} />
        </MemoryRouter>
      </Provider>
    );

    const card = screen.getByRole('article');
    fireEvent.mouseLeave(card);

    expect(handleMouseLeave).toHaveBeenCalled();
  });

  it('should render link to offer page', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const links = screen.getAllByRole('link');
    const offerLink = links.find((link) => link.getAttribute('href') === '/offer/1');
    expect(offerLink).toBeInTheDocument();
  });

  it('should render favorite button with correct state', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} />
        </MemoryRouter>
      </Provider>
    );

    const favoriteButton = container.querySelector('.place-card__bookmark-button');
    expect(favoriteButton).not.toHaveClass('place-card__bookmark-button--active');
  });

  it('should render active favorite button when offer is favorite', () => {
    const store = createMockStore();
    const favoriteOffer = { ...mockOffer, isFavorite: true };

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={favoriteOffer} />
        </MemoryRouter>
      </Provider>
    );

    const favoriteButton = container.querySelector('.place-card__bookmark-button');
    expect(favoriteButton).toHaveClass('place-card__bookmark-button--active');
  });

  it('should render with favorites variant styling', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} variant="favorites" />
        </MemoryRouter>
      </Provider>
    );

    const card = container.querySelector('.favorites__card');
    expect(card).toBeInTheDocument();
  });

  it('should render with near-places variant styling', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceCard offer={mockOffer} variant="near-places" />
        </MemoryRouter>
      </Provider>
    );

    const card = container.querySelector('.near-places__card');
    expect(card).toBeInTheDocument();
  });
});
