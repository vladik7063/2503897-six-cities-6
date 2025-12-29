import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer, UserData, AuthData, Review, CommentData } from '../types';
import { AppThunkApiConfig } from './index';
import { saveToken, dropToken } from '../services/token';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, AppThunkApiConfig>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<Offer, string, AppThunkApiConfig>(
  'offer/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer>(`/offers/${offerId}`);
    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<Offer[], string, AppThunkApiConfig>(
  'offer/fetchNearby',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Offer[]>(`/offers/${offerId}/nearby`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<Review[], string, AppThunkApiConfig>(
  'comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`/comments/${offerId}`);
    return data;
  }
);

export const postCommentAction = createAsyncThunk<Review, CommentData, AppThunkApiConfig>(
  'comments/post',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`/comments/${offerId}`, { comment, rating });
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, AppThunkApiConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>('/login');
    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, AppThunkApiConfig>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<UserData>('/login', { email, password });
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, AppThunkApiConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/login');
    dropToken();
  }
);
