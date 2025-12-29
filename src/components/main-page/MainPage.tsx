import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import OffersList from '../offers-list';
import Map from '../map';
import { CITIES, City } from '../../const/cities';

const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

interface MainPageProps {
  offers: Offer[];
}

const MainPage: React.FC<MainPageProps> = ({ offers }) => {
  const [activeCity, setActiveCity] = useState<City>(CITIES[3]);
  const [activeSortOption, setActiveSortOption] = useState('Popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredOffers = offers.filter(
    (offer) => offer.city === activeCity.name
  );

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
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => (
                <li key={city.name} className="locations__item">
                  <a
                    className={`locations__item-link tabs__item ${
                      city.name === activeCity.name
                        ? 'tabs__item--active'
                        : ''
                    }`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCity(city);
                    }}
                  >
                    <span>{city.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filteredOffers.length} places to stay in {activeCity.name}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span
                  className="places__sorting-type"
                  tabIndex={0}
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  {activeSortOption}
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul
                  className={`places__options places__options--custom ${
                    isSortOpen ? 'places__options--opened' : ''
                  }`}
                >
                  {SORT_OPTIONS.map((option) => (
                    <li
                      key={option}
                      className={`places__option ${
                        option === activeSortOption
                          ? 'places__option--active'
                          : ''
                      }`}
                      tabIndex={0}
                      onClick={() => {
                        setActiveSortOption(option);
                        setIsSortOpen(false);
                      }}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </form>
              <OffersList offers={filteredOffers} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={filteredOffers}
                  city={activeCity}
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
