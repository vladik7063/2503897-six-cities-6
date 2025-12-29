import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  checkAuthAction,
  fetchFavoritesAction,
  toggleFavoriteAction,
} from './api-actions';
import { offersReducer, userReducer, offerReducer, favoritesReducer } from './slices';
import { Offer, Review, UserData } from '../types';

const api = createAPI();
const mockAPI = new MockAdapter(api);

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

const mockUser: UserData = {
  name: 'Test User',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  email: 'test@test.com',
  token: 'test-token',
};

const getStore = () =>
  configureStore({
    reducer: {
      offers: offersReducer,
      user: userReducer,
      offer: offerReducer,
      favorites: favoritesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });

describe('Async Actions', () => {
  beforeEach(() => {
    mockAPI.reset();
  });

  describe('fetchOffersAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      const offers = [mockOffer];
      mockAPI.onGet('/offers').reply(200, offers);

      const store = getStore();
      await store.dispatch(fetchOffersAction());

      const state = store.getState();
      expect(state.offers.offers).toEqual(offers);
      expect(state.offers.isOffersLoading).toBe(false);
    });

    it('should dispatch rejected when server returns error', async () => {
      mockAPI.onGet('/offers').reply(500);

      const store = getStore();
      await store.dispatch(fetchOffersAction());

      const state = store.getState();
      expect(state.offers.offers).toEqual([]);
      expect(state.offers.isOffersLoading).toBe(false);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      mockAPI.onGet('/offers/1').reply(200, mockOffer);

      const store = getStore();
      await store.dispatch(fetchOfferAction('1'));

      const state = store.getState();
      expect(state.offer.currentOffer).toEqual(mockOffer);
      expect(state.offer.isOfferLoading).toBe(false);
    });

    it('should dispatch rejected when server returns 404', async () => {
      mockAPI.onGet('/offers/999').reply(404);

      const store = getStore();
      await store.dispatch(fetchOfferAction('999'));

      const state = store.getState();
      expect(state.offer.isOfferNotFound).toBe(true);
      expect(state.offer.isOfferLoading).toBe(false);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      const nearbyOffers = [mockOffer];
      mockAPI.onGet('/offers/1/nearby').reply(200, nearbyOffers);

      const store = getStore();
      await store.dispatch(fetchNearbyOffersAction('1'));

      const state = store.getState();
      expect(state.offer.nearbyOffers).toEqual(nearbyOffers);
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      const comments = [mockReview];
      mockAPI.onGet('/comments/1').reply(200, comments);

      const store = getStore();
      await store.dispatch(fetchCommentsAction('1'));

      const state = store.getState();
      expect(state.offer.comments).toEqual(comments);
    });
  });

  describe('postCommentAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      mockAPI.onPost('/comments/1').reply(200, mockReview);

      const store = getStore();
      await store.dispatch(postCommentAction({
        offerId: '1',
        comment: 'Test comment',
        rating: 4,
      }));

      const state = store.getState();
      expect(state.offer.comments).toContainEqual(mockReview);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      mockAPI.onGet('/login').reply(200, mockUser);

      const store = getStore();
      await store.dispatch(checkAuthAction());

      const state = store.getState();
      expect(state.user.user).toEqual(mockUser);
    });

    it('should dispatch rejected when server returns 401', async () => {
      mockAPI.onGet('/login').reply(401);

      const store = getStore();
      await store.dispatch(checkAuthAction());

      const state = store.getState();
      expect(state.user.user).toBeNull();
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch fulfilled when server returns 200', async () => {
      const favorites = [mockOffer];
      mockAPI.onGet('/favorite').reply(200, favorites);

      const store = getStore();
      await store.dispatch(fetchFavoritesAction());

      const state = store.getState();
      expect(state.favorites.favorites).toEqual(favorites);
      expect(state.favorites.isFavoritesLoading).toBe(false);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should dispatch fulfilled when adding to favorites', async () => {
      const favoritedOffer = { ...mockOffer, isFavorite: true };
      mockAPI.onPost('/favorite/1/1').reply(200, favoritedOffer);

      const store = getStore();
      await store.dispatch(toggleFavoriteAction({ offerId: '1', status: 1 }));

      const state = store.getState();
      expect(state.favorites.favorites).toContainEqual(favoritedOffer);
    });

    it('should dispatch fulfilled when removing from favorites', async () => {
      const unfavoritedOffer = { ...mockOffer, isFavorite: false };
      mockAPI.onPost('/favorite/1/0').reply(200, unfavoritedOffer);

      const store = getStore();
      await store.dispatch(toggleFavoriteAction({ offerId: '1', status: 0 }));

      const state = store.getState();
      expect(state.favorites.favorites).not.toContainEqual(expect.objectContaining({ id: '1', isFavorite: true }));
    });
  });
});
