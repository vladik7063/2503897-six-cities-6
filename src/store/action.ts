import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types';

export const changeCity = createAction<string>('city/change');
export const setOffers = createAction<Offer[]>('offers/set');
