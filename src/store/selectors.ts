import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const selectCity = (state: RootState) => state.offers.city;
export const selectOffers = (state: RootState) => state.offers.offers;
export const selectIsOffersLoading = (state: RootState) => state.offers.isOffersLoading;

export const selectAuthorizationStatus = (state: RootState) => state.user.authorizationStatus;
export const selectUser = (state: RootState) => state.user.user;

export const selectCurrentOffer = (state: RootState) => state.offer.currentOffer;
export const selectNearbyOffers = (state: RootState) => state.offer.nearbyOffers;
export const selectComments = (state: RootState) => state.offer.comments;
export const selectIsOfferLoading = (state: RootState) => state.offer.isOfferLoading;
export const selectIsOfferNotFound = (state: RootState) => state.offer.isOfferNotFound;

export const selectOffersByCity = createSelector(
  [selectOffers, selectCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city)
);

export const selectFavoriteOffers = createSelector(
  [selectOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const selectFavoriteCount = createSelector(
  [selectFavoriteOffers],
  (favoriteOffers) => favoriteOffers.length
);

export const selectSortedComments = createSelector(
  [selectComments],
  (comments) => {
    const sortedComments = [...comments].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sortedComments.slice(0, 10);
  }
);
