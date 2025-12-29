import React, { useState, ChangeEvent, FormEvent } from 'react';

const MIN_REVIEW_LENGTH = 50;
const MAX_RATING = 5;

const RATING_TITLES = [
  'terrible',
  'bad',
  'okay',
  'good',
  'excellent',
];

const ReviewForm: React.FC = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  const isReviewValid = review.length >= MIN_REVIEW_LENGTH;
  const isRatingSelected = rating > 0;
  const isSubmitDisabled = !isReviewValid || !isRatingSelected;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {Array.from({ length: MAX_RATING }, (_, index) => {
          const value = MAX_RATING - index;
          const title = RATING_TITLES[value - 1];

          return (
            <React.Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={`${value}-stars`}
                type="radio"
                checked={rating === value}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`${value}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg
                  className="form__star-image"
                  width="37"
                  height="33"
                >
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </React.Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Share details of your stay, what you liked or what could be better"
        value={review}
        onChange={handleReviewChange}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit a review, please set a{' '}
          <span className="reviews__star">rating</span> and write at least{' '}
          <b className="reviews__text-amount">
            {MIN_REVIEW_LENGTH} characters
          </b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
