import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import PlaceCard from '../../components/place-card';
import Header from '../../components/header';

interface FavoritesPageProps {
  offers: Offer[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ offers }) => {
  const offersByCity = useMemo(() =>
    offers.reduce<Record<string, Offer[]>>((acc, offer) => {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
      return acc;
    }, {}), [offers]);

  const cities = useMemo(() => Object.keys(offersByCity), [offersByCity]);
  const isEmpty = offers.length === 0;

  return (
    <div className="page">
      <Header />

      <main className={`page__main page__main--favorites ${isEmpty ? 'page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {cities.map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offersByCity[city].map((offer) => (
                        <PlaceCard
                          key={offer.id}
                          offer={offer}
                          variant="favorites"
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

const MemoizedFavoritesPage = memo(FavoritesPage);

export default MemoizedFavoritesPage;
