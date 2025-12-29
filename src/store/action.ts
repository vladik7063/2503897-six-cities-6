import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<string>('city/change');
