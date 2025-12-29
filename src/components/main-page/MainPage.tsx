import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { changeCity } from '../../store/action';
import { CITIES } from '../../const/cities';
import CityList from '../city-list';
import OffersList from '../offers-list';
import Map from '../map';

const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const activeCity = useSelector((state: RootState) => state.city);
  const offers = useSelector((state: RootState) => state.offers);
  const [activeSortOption, setActiveSortOption] = useState('Popular');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const mapCity = CITIES.find(
    (city) => city.name === activeCity
  );

  if (!mapCity) {
    return null;
  }

  const filteredOffers = offers.filter(
    (offer) => offer.city === activeCity
  );

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
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
                  city={mapCity}
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
