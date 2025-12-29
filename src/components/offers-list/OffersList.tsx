import React from 'react';
import { Offer } from '../../types/offer';
import PlaceCard from '../place-card';

interface OffersListProps {
  offers: Offer[];
  onOfferHover: (offerId: string) => void;
  onOfferLeave: () => void;
}

const OffersList: React.FC<OffersListProps> = ({ offers, onOfferHover, onOfferLeave }) => (
  <div className="cities__places-list places__list tabs__content">
    {offers.map((offer) => (
      <PlaceCard
        key={offer.id}
        offer={offer}
        variant="cities"
        onMouseEnter={() => onOfferHover(offer.id)}
        onMouseLeave={onOfferLeave}
      />
    ))}
  </div>
);

export default OffersList;
