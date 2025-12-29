import { describe, it, expect } from 'vitest';
import offersReducer, { changeCity } from './offers-slice';
import { fetchOffersAction, toggleFavoriteAction } from '../api-actions';
import { Offer } from '../../types';

const mockOffer: Offer = {
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

describe('offersSlice', () => {
  const initialState = {
    city: 'Paris',
    offers: [],
    isOffersLoading: false,
  };

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = offersReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with undefined state', () => {
      const result = offersReducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });
  });

  describe('changeCity action', () => {
    it('should change city', () => {
      const result = offersReducer(initialState, changeCity('Amsterdam'));

      expect(result.city).toBe('Amsterdam');
    });
  });

  describe('fetchOffersAction', () => {
    it('should set isOffersLoading to true on pending', () => {
      const result = offersReducer(initialState, fetchOffersAction.pending('', undefined));

      expect(result.isOffersLoading).toBe(true);
    });

    it('should set offers and isOffersLoading to false on fulfilled', () => {
      const offers = [mockOffer];
      const state = { ...initialState, isOffersLoading: true };

      const result = offersReducer(state, fetchOffersAction.fulfilled(offers, '', undefined));

      expect(result.offers).toEqual(offers);
      expect(result.isOffersLoading).toBe(false);
    });

    it('should set isOffersLoading to false on rejected', () => {
      const state = { ...initialState, isOffersLoading: true };

      const result = offersReducer(state, fetchOffersAction.rejected(null, '', undefined));

      expect(result.isOffersLoading).toBe(false);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should update isFavorite for existing offer on fulfilled', () => {
      const state = {
        ...initialState,
        offers: [mockOffer],
      };
      const updatedOffer = { ...mockOffer, isFavorite: true };

      const result = offersReducer(
        state,
        toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
      );

      expect(result.offers[0].isFavorite).toBe(true);
    });

    it('should not update offers if offer not found', () => {
      const state = {
        ...initialState,
        offers: [mockOffer],
      };
      const differentOffer = { ...mockOffer, id: '999', isFavorite: true };

      const result = offersReducer(
        state,
        toggleFavoriteAction.fulfilled(differentOffer, '', { offerId: '999', status: 1 })
      );

      expect(result.offers[0].isFavorite).toBe(false);
    });
  });
});
