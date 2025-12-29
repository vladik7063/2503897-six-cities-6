import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { postCommentAction } from '../../store/api-actions';
import { ReviewLength, Rating, RatingTitles } from '../../const/const';

const MIN_REVIEW_LENGTH = ReviewLength.Min;
const MAX_REVIEW_LENGTH = ReviewLength.Max;
const MAX_RATING = Rating.MaxStars;
const RATING_TITLES = RatingTitles;
type ReviewFormProps = {
  offerId: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ offerId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (rating === 0 || review.length < MIN_REVIEW_LENGTH) {
      return;
    }

    setIsSubmitting(true);

    dispatch(
      postCommentAction({
        offerId,
        comment: review,
        rating,
      })
    )
      .then(() => {
        setRating(0);
        setReview('');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isReviewValid =
    review.length >= MIN_REVIEW_LENGTH &&
    review.length <= MAX_REVIEW_LENGTH;

  const isSubmitDisabled =
    !isReviewValid || rating === 0 || isSubmitting;

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
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
                disabled={isSubmitting}
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
        disabled={isSubmitting}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit a review, please set a{' '}
          <span className="reviews__star">rating</span> and write between{' '}
          <b className="reviews__text-amount">
            {MIN_REVIEW_LENGTH} and {MAX_REVIEW_LENGTH} characters
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
