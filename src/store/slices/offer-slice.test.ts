import { describe, it, expect } from 'vitest';
import offerReducer from './offer-slice';
import {
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  toggleFavoriteAction,
} from '../api-actions';
import { Offer, Review } from '../../types';

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

const mockReview: Review = {
  id: '1',
  user: {
    name: 'Test User',
    avatarUrl: 'img/avatar.jpg',
  },
  rating: 4,
  comment: 'Test comment',
  date: '2024-01-01',
};

describe('offerSlice', () => {
  const initialState = {
    currentOffer: null,
    nearbyOffers: [],
    comments: [],
    isOfferLoading: false,
    isOfferNotFound: false,
  };

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = offerReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with undefined state', () => {
      const result = offerReducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });
  });

  describe('fetchOfferAction', () => {
    it('should set isOfferLoading to true and isOfferNotFound to false on pending', () => {
      const result = offerReducer(initialState, fetchOfferAction.pending('', '1'));

      expect(result.isOfferLoading).toBe(true);
      expect(result.isOfferNotFound).toBe(false);
    });

    it('should set currentOffer and isOfferLoading to false on fulfilled', () => {
      const state = { ...initialState, isOfferLoading: true };

      const result = offerReducer(state, fetchOfferAction.fulfilled(mockOffer, '', '1'));

      expect(result.currentOffer).toEqual(mockOffer);
      expect(result.isOfferLoading).toBe(false);
    });

    it('should set isOfferLoading to false and isOfferNotFound to true on rejected', () => {
      const state = { ...initialState, isOfferLoading: true };

      const result = offerReducer(state, fetchOfferAction.rejected(null, '', '1'));

      expect(result.isOfferLoading).toBe(false);
      expect(result.isOfferNotFound).toBe(true);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should set nearbyOffers on fulfilled', () => {
      const nearbyOffers = [mockOffer];

      const result = offerReducer(
        initialState,
        fetchNearbyOffersAction.fulfilled(nearbyOffers, '', '1')
      );

      expect(result.nearbyOffers).toEqual(nearbyOffers);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should set comments on fulfilled', () => {
      const comments = [mockReview];

      const result = offerReducer(
        initialState,
        fetchCommentsAction.fulfilled(comments, '', '1')
      );

      expect(result.comments).toEqual(comments);
    });
  });

  describe('postCommentAction', () => {
    it('should add new comment to comments on fulfilled', () => {
      const state = { ...initialState, comments: [mockReview] };
      const newReview: Review = { ...mockReview, id: '2', comment: 'New comment' };

      const result = offerReducer(
        state,
        postCommentAction.fulfilled(newReview, '', { offerId: '1', comment: 'New comment', rating: 4 })
      );

      expect(result.comments).toHaveLength(2);
      expect(result.comments[1]).toEqual(newReview);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should update currentOffer isFavorite when it matches', () => {
      const state = { ...initialState, currentOffer: mockOffer };
      const updatedOffer = { ...mockOffer, isFavorite: true };

      const result = offerReducer(
        state,
        toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '1', status: 1 })
      );

      expect(result.currentOffer?.isFavorite).toBe(true);
    });

    it('should not update currentOffer when id does not match', () => {
      const state = { ...initialState, currentOffer: mockOffer };
      const differentOffer = { ...mockOffer, id: '999', isFavorite: true };

      const result = offerReducer(
        state,
        toggleFavoriteAction.fulfilled(differentOffer, '', { offerId: '999', status: 1 })
      );

      expect(result.currentOffer?.isFavorite).toBe(false);
    });

    it('should update nearbyOffer isFavorite when it matches', () => {
      const nearbyOffer = { ...mockOffer, id: '2' };
      const state = { ...initialState, nearbyOffers: [nearbyOffer] };
      const updatedOffer = { ...nearbyOffer, isFavorite: true };

      const result = offerReducer(
        state,
        toggleFavoriteAction.fulfilled(updatedOffer, '', { offerId: '2', status: 1 })
      );

      expect(result.nearbyOffers[0].isFavorite).toBe(true);
    });

    it('should not update nearbyOffers when id does not match', () => {
      const nearbyOffer = { ...mockOffer, id: '2' };
      const state = { ...initialState, nearbyOffers: [nearbyOffer] };
      const differentOffer = { ...mockOffer, id: '999', isFavorite: true };

      const result = offerReducer(
        state,
        toggleFavoriteAction.fulfilled(differentOffer, '', { offerId: '999', status: 1 })
      );

      expect(result.nearbyOffers[0].isFavorite).toBe(false);
    });
  });
});
