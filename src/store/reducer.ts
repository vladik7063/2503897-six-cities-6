import { createReducer } from '@reduxjs/toolkit';
import { Offer, AuthorizationStatus, UserData } from '../types';
import { changeCity } from './action';
import { fetchOffersAction, checkAuthAction, loginAction, logoutAction } from './api-actions';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    });
});

export { reducer };
