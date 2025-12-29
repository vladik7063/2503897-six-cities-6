import React, { useState } from 'react';
import { SORT_OPTIONS, SortOption } from './constants';

type SortOptionsProps = {
  activeSortOption: SortOption;
  onChange: (option: SortOption) => void;
};

const SortOptions: React.FC<SortOptionsProps> = ({
  activeSortOption,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: SortOption) => {
    onChange(option);
    setIsOpen(false);
  };

  const optionsClassName = `places__options places__options--custom ${
    isOpen ? 'places__options--opened' : ''
  }`;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {activeSortOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>

      <ul className={optionsClassName}>
        {SORT_OPTIONS.map((option) => (
          <li
            key={option}
            className={`places__option ${
              option === activeSortOption
                ? 'places__option--active'
                : ''
            }`}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOptions;
