import React from 'react';
import { CITIES } from '../../const/cities';

interface CityListProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({ activeCity, onCityChange }) => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => (
      <li key={city.name} className="locations__item">
        <a
          className={`locations__item-link tabs__item ${
            city.name === activeCity ? 'tabs__item--active' : ''
          }`}
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCityChange(city.name);
          }}
        >
          <span>{city.name}</span>
        </a>
      </li>
    ))}
  </ul>
);

export default CityList;
