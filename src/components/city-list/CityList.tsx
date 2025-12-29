import React, { memo } from 'react';
import { CITIES } from '../../const/cities';
import CityItem from './CityItem';

interface CityListProps {
  activeCity: string;
  onCityChange: (city: string) => void;
}

const CityList: React.FC<CityListProps> = ({
  activeCity,
  onCityChange,
}) => (
  <ul className="locations__list tabs__list">
    {CITIES.map((city) => (
      <CityItem
        key={city.name}
        city={city.name}
        isActive={city.name === activeCity}
        onClick={onCityChange}
      />
    ))}
  </ul>
);

const MemoizedCityList = memo(CityList);
MemoizedCityList.displayName = 'CityList';

export default MemoizedCityList;
