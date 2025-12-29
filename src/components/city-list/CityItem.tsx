import React, { memo, useCallback } from 'react';

interface CityItemProps {
  city: string;
  isActive: boolean;
  onClick: (city: string) => void;
}

const CityItem: React.FC<CityItemProps> = ({
  city,
  isActive,
  onClick,
}) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onClick(city);
    },
    [city, onClick]
  );

  return (
    <li className="locations__item">
      <a
        href="#"
        className={`locations__item-link tabs__item ${
          isActive ? 'tabs__item--active' : ''
        }`}
        onClick={handleClick}
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

const MemoizedCityItem = memo(CityItem);
MemoizedCityItem.displayName = 'CityItem';

export default MemoizedCityItem;
