import React, { memo } from 'react';
import { Review as ReviewType } from '../../types';
import Review from '../review-item';

interface ReviewsListProps {
  reviews: ReviewType[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => (
  <>
    <h2 className="reviews__title">
        Reviews &middot;
      <span className="reviews__amount"> {reviews.length}</span>
    </h2>

    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  </>
);

const MemoizedReviewsList = memo(ReviewsList);

export default MemoizedReviewsList;
