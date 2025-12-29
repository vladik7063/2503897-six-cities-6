import React, { useState } from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card';

interface OffersListProps {
  offers: Offer[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const handleActiveOfferChange = (offerId: string | null) => {
    setActiveOfferId(offerId);
  };

  const hasActiveOffer = activeOfferId !== null;
  void hasActiveOffer;

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant="cities"
          onMouseEnter={() => handleActiveOfferChange(offer.id)}
          onMouseLeave={() => handleActiveOfferChange(null)}
        />
      ))}
    </div>
  );
};

export default OffersList;
