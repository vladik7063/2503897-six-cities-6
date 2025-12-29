import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Review from './ReviewItem';
import { Review as ReviewType } from '../../types';

const mockReview: ReviewType = {
  id: '1',
  user: {
    name: 'Max',
    avatarUrl: 'img/avatar-max.jpg',
  },
  rating: 4,
  comment: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.',
  date: '2024-04-15',
};

describe('Review Component', () => {
  it('should render correctly', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it('should render user avatar', () => {
    render(<Review review={mockReview} />);

    const avatar = screen.getByAltText('Reviews avatar');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'img/avatar-max.jpg');
  });

  it('should render formatted date', () => {
    render(<Review review={mockReview} />);

    expect(screen.getByText('April 2024')).toBeInTheDocument();
  });

  it('should render rating as percentage width', () => {
    const { container } = render(<Review review={mockReview} />);

    const ratingSpan = container.querySelector('.reviews__stars span');
    expect(ratingSpan).toHaveStyle({ width: '80%' });
  });

  it('should render datetime attribute on time element', () => {
    render(<Review review={mockReview} />);

    const timeElement = screen.getByText('April 2024');
    expect(timeElement).toHaveAttribute('datetime', '2024-04-15');
  });
});
