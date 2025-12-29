import { describe, it, expect } from 'vitest';
import favoritesReducer from './favorites-slice';
import { fetchFavoritesAction, toggleFavoriteAction, logoutAction } from '../api-actions';
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
  isFavorite: true,
};

describe('favoritesSlice', () => {
  const initialState = {
    favorites: [],
    isFavoritesLoading: false,
  };

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = favoritesReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with undefined state', () => {
      const result = favoritesReducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should set isFavoritesLoading to true on pending', () => {
      const result = favoritesReducer(initialState, fetchFavoritesAction.pending('', undefined));

      expect(result.isFavoritesLoading).toBe(true);
    });

    it('should set favorites and isFavoritesLoading to false on fulfilled', () => {
      const favorites = [mockOffer];
      const state = { ...initialState, isFavoritesLoading: true };

      const result = favoritesReducer(state, fetchFavoritesAction.fulfilled(favorites, '', undefined));

      expect(result.favorites).toEqual(favorites);
      expect(result.isFavoritesLoading).toBe(false);
    });

    it('should set isFavoritesLoading to false on rejected', () => {
      const state = { ...initialState, isFavoritesLoading: true };

      const result = favoritesReducer(state, fetchFavoritesAction.rejected(null, '', undefined));

      expect(result.isFavoritesLoading).toBe(false);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should add offer to favorites when isFavorite is true and offer does not exist', () => {
      const result = favoritesReducer(
        initialState,
        toggleFavoriteAction.fulfilled(mockOffer, '', { offerId: '1', status: 1 })
      );

      expect(result.favorites).toHaveLength(1);
      expect(result.favorites[0]).toEqual(mockOffer);
    });

    it('should not add duplicate offer to favorites', () => {
      const state = { ...initialState, favorites: [mockOffer] };

      const result = favoritesReducer(
        state,
        toggleFavoriteAction.fulfilled(mockOffer, '', { offerId: '1', status: 1 })
      );

      expect(result.favorites).toHaveLength(1);
    });

    it('should remove offer from favorites when isFavorite is false', () => {
      const state = { ...initialState, favorites: [mockOffer] };
      const unfavoritedOffer = { ...mockOffer, isFavorite: false };

      const result = favoritesReducer(
        state,
        toggleFavoriteAction.fulfilled(unfavoritedOffer, '', { offerId: '1', status: 0 })
      );

      expect(result.favorites).toHaveLength(0);
    });

    it('should not affect favorites when removing non-existent offer', () => {
      const state = { ...initialState, favorites: [mockOffer] };
      const differentOffer = { ...mockOffer, id: '999', isFavorite: false };

      const result = favoritesReducer(
        state,
        toggleFavoriteAction.fulfilled(differentOffer, '', { offerId: '999', status: 0 })
      );

      expect(result.favorites).toHaveLength(1);
    });
  });

  describe('logoutAction', () => {
    it('should clear favorites on fulfilled', () => {
      const state = { ...initialState, favorites: [mockOffer] };

      const result = favoritesReducer(state, logoutAction.fulfilled(undefined, '', undefined));

      expect(result.favorites).toHaveLength(0);
    });
  });
});
