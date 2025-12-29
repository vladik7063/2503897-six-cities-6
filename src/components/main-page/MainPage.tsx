import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/action';
import { CITIES } from '../../const/cities';
import CityList from '../city-list';
import OffersList from '../offers-list';
import Map from '../map';
import SortOptions, { SortOption } from '../sort-options';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);

  const [activeSort, setActiveSort] = useState<SortOption>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const mapCity = CITIES.find((city) => city.name === activeCity);
  if (!mapCity) {
    return null;
  }

  const filteredOffers = offers.filter((offer) => offer.city.name === activeCity);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (activeSort) {
      case 'Price: low to high':
        return a.price - b.price;
      case 'Price: high to low':
        return b.price - a.price;
      case 'Top rated first':
        return b.rating - a.rating;
      case 'Popular':
      default:
        return 0;
    }
  });

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
    setActiveOfferId(null);
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to="/favorites"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList activeCity={activeCity} onCityChange={handleCityChange} />
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity}
              </b>
              <SortOptions
                activeSortOption={activeSort}
                onChange={setActiveSort}
              />
              <OffersList
                offers={sortedOffers}
                onOfferHover={setActiveOfferId}
                onOfferLeave={() => setActiveOfferId(null)}
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={sortedOffers}
                  city={mapCity}
                  activeOfferId={activeOfferId}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
