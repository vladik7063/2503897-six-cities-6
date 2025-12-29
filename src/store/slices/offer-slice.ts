import { createSlice } from '@reduxjs/toolkit';
import { Offer, Review } from '../../types';
import { fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction, postCommentAction, toggleFavoriteAction } from '../api-actions';

type OfferState = {
  currentOffer: Offer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  isOfferNotFound: boolean;
};

const initialState: OfferState = {
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  isOfferNotFound: false,
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        if (state.currentOffer && state.currentOffer.id === updatedOffer.id) {
          state.currentOffer.isFavorite = updatedOffer.isFavorite;
        }
        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }
      });
  },
});

export default offerSlice.reducer;
