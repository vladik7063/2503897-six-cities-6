import { createReducer } from '@reduxjs/toolkit';
import { Offer, AuthorizationStatus, UserData, Review } from '../types';
import { changeCity } from './action';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  postCommentAction,
  checkAuthAction,
  loginAction,
  logoutAction,
} from './api-actions';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isOfferNotFound: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.user = action.payload;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(logoutAction.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.isOfferLoading = true;
      state.isOfferNotFound = false;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.isOfferLoading = false;
      state.isOfferNotFound = true;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(postCommentAction.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    });
});

export { reducer };
