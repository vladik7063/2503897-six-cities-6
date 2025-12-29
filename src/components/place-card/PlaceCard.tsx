import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Offer, AuthorizationStatus } from '../../types';
import { AppDispatch } from '../../store';
import { toggleFavoriteAction } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/selectors';

type PlaceCardVariant = 'cities' | 'favorites' | 'near-places';

interface PlaceCardProps {
  offer: Offer;
  variant?: PlaceCardVariant;
  onMouseEnter?: (offerId: string) => void;
  onMouseLeave?: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  offer,
  variant = 'cities',
  onMouseEnter,
  onMouseLeave,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const { id, title, type, price, rating, previewImage, isPremium, isFavorite } = offer;

  const imageSize = variant === 'favorites'
    ? { width: 150, height: 110 }
    : { width: 260, height: 200 };

  const getCardClass = () => {
    if (variant === 'favorites') {
      return 'favorites__card place-card';
    }
    if (variant === 'near-places') {
      return 'near-places__card place-card';
    }
    return 'cities__card place-card';
  };
  const cardClass = getCardClass();

  const getImageWrapperClass = () => {
    if (variant === 'favorites') {
      return 'favorites__image-wrapper place-card__image-wrapper';
    }
    if (variant === 'near-places') {
      return 'near-places__image-wrapper place-card__image-wrapper';
    }
    return 'cities__image-wrapper place-card__image-wrapper';
  };
  const imageWrapperClass = getImageWrapperClass();

  const infoClass = variant === 'favorites'
    ? 'favorites__card-info place-card__info'
    : 'place-card__info';

  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.(id);
  }, [id, onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave?.();
  }, [onMouseLeave]);

  const handleFavoriteClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }
    dispatch(toggleFavoriteAction({
      offerId: id,
      status: isFavorite ? 0 : 1,
    }));
  }, [authorizationStatus, dispatch, id, isFavorite, navigate]);

  return (
    <article
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </Link>
      </div>
      <div className={infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const MemoizedPlaceCard = memo(PlaceCard);

export default MemoizedPlaceCard;
