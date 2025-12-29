import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { offersReducer, userReducer, offerReducer, favoritesReducer } from './slices';
import { createAPI } from '../services/api';

const api = createAPI();

const rootReducer = combineReducers({
  offers: offersReducer,
  user: userReducer,
  offer: offerReducer,
  favorites: favoritesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
};
