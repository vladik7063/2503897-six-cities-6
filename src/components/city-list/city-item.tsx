import React, { memo, useCallback } from 'react';

interface CityItemProps {
  city: string;
  isActive: boolean;
  onCityClick: (city: string) => void;
}

const CityItem: React.FC<CityItemProps> = ({
  city,
  isActive,
  onCityClick,
}) => {
  const handleCityClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onCityClick(city);
    },
    [city, onCityClick]
  );

  return (
    <li className="locations__item">
      <a
        href="#"
        className={`locations__item-link tabs__item ${
          isActive ? 'tabs__item--active' : ''
        }`}
        onClick={handleCityClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

const MemoizedCityItem = memo(CityItem);
MemoizedCityItem.displayName = 'CityItem';

export default MemoizedCityItem;
