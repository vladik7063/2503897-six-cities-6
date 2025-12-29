import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { fetchOffersAction } from '../api-actions';

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
      });
  },
});

export const { changeCity } = offersSlice.actions;
export default offersSlice.reducer;
