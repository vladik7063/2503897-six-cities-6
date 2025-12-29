import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MainPage from './main-page';
import LoginPage from './login-page';
import FavoritesPage from './favorites-page';
import OfferPage from './offer-page';
import NotFoundPage from './not-found-page';
import PrivateRoute from './private-route';
import Spinner from './spinner';

const App: React.FC = () => {
  const offers = useSelector((state: RootState) => state.offers);
  const isOffersLoading = useSelector((state: RootState) => state.isOffersLoading);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

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
