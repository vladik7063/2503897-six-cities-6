import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../types';
import { AppThunkApiConfig } from './index';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, AppThunkApiConfig>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>('/offers');
    return data;
  }
);
