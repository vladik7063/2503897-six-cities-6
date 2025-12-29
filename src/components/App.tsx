import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Offer, Review } from '../types/offer';
import MainPage from './main-page';
import LoginPage from './login-page';
import FavoritesPage from './favorites-page';
import OfferPage from './offer-page';
import NotFoundPage from './not-found-page';
import PrivateRoute from './private-route';

interface AppProps {
  offers: Offer[];
  reviews: Review[];
}

const App: React.FC<AppProps> = ({ offers, reviews }) => {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage offers={offers} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized>
              <FavoritesPage offers={favoriteOffers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage offers={offers} reviews={reviews}/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
