import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCity, selectOffersByCity } from '../../store/selectors';
import { changeCity } from '../../store/action';
import { CITIES } from '../../const/cities';
import CityList from '../city-list';
import OffersList from '../offers-list';
import Map from '../map';
import SortOptions, { SortOption } from '../sort-options';
import Header from '../header';

const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const activeCity = useSelector(selectCity);
  const filteredOffers = useSelector(selectOffersByCity);

  const [activeSort, setActiveSort] = useState<SortOption>('Popular');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const mapCity = useMemo(
    () => CITIES.find((city) => city.name === activeCity),
    [activeCity]
  );

  const sortedOffers = useMemo(() => {
    switch (activeSort) {
      case 'Price: low to high':
        return filteredOffers.slice().sort((a, b) => a.price - b.price);
      case 'Price: high to low':
        return filteredOffers.slice().sort((a, b) => b.price - a.price);
      case 'Top rated first':
        return filteredOffers.slice().sort((a, b) => b.rating - a.rating);
      case 'Popular':
      default:
        return filteredOffers;
    }
  }, [filteredOffers, activeSort]);

  const handleCityChange = useCallback(
    (city: string) => {
      dispatch(changeCity(city));
      setActiveOfferId(null);
    },
    [dispatch]
  );

  const handleOfferHover = useCallback(
    (offerId: string) => {
      setActiveOfferId(offerId);
    },
    []
  );

  const handleOfferLeave = useCallback(() => {
    setActiveOfferId(null);
  }, []);

  if (!mapCity) {
    return null;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

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
                onOfferHover={handleOfferHover}
                onOfferLeave={handleOfferLeave}
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
