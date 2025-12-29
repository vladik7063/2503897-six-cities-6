import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { fetchFavoritesAction, toggleFavoriteAction, logoutAction } from '../api-actions';

type FavoritesState = {
  favorites: Offer[];
  isFavoritesLoading: boolean;
};

const initialState: FavoritesState = {
  favorites: [],
  isFavoritesLoading: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (updatedOffer.isFavorite) {
          const exists = state.favorites.some((offer) => offer.id === updatedOffer.id);
          if (!exists) {
            state.favorites.push(updatedOffer);
          }
        } else {
          state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
        }
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});

export default favoritesSlice.reducer;
