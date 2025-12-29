import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { fetchOffersAction, toggleFavoriteAction } from '../api-actions';

type OffersState = {
  city: string;
  offers: Offer[];
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  city: 'Paris',
  offers: [],
  isOffersLoading: false,
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const index = state.offers.findIndex((offer) => offer.id === updatedOffer.id);
        if (index !== -1) {
          state.offers[index].isFavorite = updatedOffer.isFavorite;
        }
      });
  },
});

export const { changeCity } = offersSlice.actions;
export default offersSlice.reducer;
