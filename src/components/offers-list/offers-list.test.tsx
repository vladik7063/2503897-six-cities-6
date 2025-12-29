import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OffersList from './offers-list';
import { userReducer, favoritesReducer } from '../../store/slices';
import { AuthorizationStatus, Offer } from '../../types';

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'First apartment',
    type: 'apartment',
    price: 100,
    rating: 4.0,
    previewImage: 'img/apartment-01.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522 },
    },
    location: { latitude: 48.8566, longitude: 2.3522 },
    isPremium: true,
    isFavorite: false,
  },
  {
    id: '2',
    title: 'Second apartment',
    type: 'room',
    price: 80,
    rating: 3.5,
    previewImage: 'img/apartment-02.jpg',
    city: {
      name: 'Paris',
      location: { latitude: 48.8566, longitude: 2.3522 },
    },
    location: { latitude: 48.8576, longitude: 2.3532 },
    isPremium: false,
    isFavorite: true,
  },
];

const createMockStore = () =>
  configureStore({
    reducer: {
      user: userReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
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

describe('OffersList Component', () => {
  it('should render list of offers', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('First apartment')).toBeInTheDocument();
    expect(screen.getByText('Second apartment')).toBeInTheDocument();
  });

  it('should render correct number of place cards', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });

  it('should render empty list when no offers', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });

  it('should call onActiveOfferChange when hovering over card', () => {
    const store = createMockStore();
    const handleActiveOfferChange = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} onActiveOfferChange={handleActiveOfferChange} />
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByRole('article');
    fireEvent.mouseEnter(cards[0]);

    expect(handleActiveOfferChange).toHaveBeenCalledWith('1');
  });

  it('should call onActiveOfferChange with null when mouse leaves card', () => {
    const store = createMockStore();
    const handleActiveOfferChange = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} onActiveOfferChange={handleActiveOfferChange} />
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByRole('article');
    fireEvent.mouseLeave(cards[0]);

    expect(handleActiveOfferChange).toHaveBeenCalledWith(null);
  });

  it('should render with correct container class', () => {
    const store = createMockStore();

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <OffersList offers={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(container.querySelector('.cities__places-list')).toBeInTheDocument();
  });
});
