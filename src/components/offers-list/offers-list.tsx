import React, { memo, useCallback } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card';

interface OffersListProps {
  offers: Offer[];
  onOfferHover: (offerId: string) => void;
  onOfferLeave: () => void;
}

const OffersList: React.FC<OffersListProps> = ({
  offers,
  onOfferHover,
  onOfferLeave,
}) => {
  const handleMouseEnter = useCallback(
    (offerId: string) => {
      onOfferHover(offerId);
    },
    [onOfferHover]
  );

  const handleMouseLeave = useCallback(() => {
    onOfferLeave();
  }, [onOfferLeave]);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant="cities"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

const MemoizedOffersList = memo(OffersList);

export default MemoizedOffersList;
