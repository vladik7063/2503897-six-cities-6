import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsOffersLoading, selectFavoriteOffers, selectAuthorizationStatus } from '../store/selectors';
import { fetchFavoritesAction } from '../store/api-actions';
import { AuthorizationStatus } from '../types';
import { AppDispatch } from '../store';
import MainPage from '../pages/main-page';
import LoginPage from '../pages/login-page';
import FavoritesPage from '../pages/favorites-page';
import OfferPage from '../pages/offer-page';
import NotFoundPage from '../pages/not-found-page';
import PrivateRoute from './private-route';
import Spinner from './spinner';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isOffersLoading = useSelector(selectIsOffersLoading);
  const favoriteOffers = useSelector(selectFavoriteOffers);

  const authorizationStatus = useSelector(selectAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavoritesAction());
    }
  }, [authorizationStatus, dispatch]);

  if (isOffersLoading) {
    return <Spinner />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
