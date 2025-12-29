import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types';
import { changeCity } from './action';
import { fetchOffersAction } from './api-actions';

type State = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
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
    });
});

export { reducer };
