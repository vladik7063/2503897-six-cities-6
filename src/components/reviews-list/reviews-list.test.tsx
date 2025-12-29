import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ReviewsList from './reviews-list';
import { Review } from '../../types';

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
    },
    rating: 4,
    comment: 'First review comment',
    date: '2024-04-15',
  },
  {
    id: '2',
    user: {
      name: 'Alice',
      avatarUrl: 'img/avatar-alice.jpg',
    },
    rating: 5,
    comment: 'Second review comment',
    date: '2024-04-10',
  },
];

describe('ReviewsList Component', () => {
  it('should render correctly', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/)).toBeInTheDocument();
  });

  it('should render reviews count', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should render all reviews', () => {
    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('First review comment')).toBeInTheDocument();
    expect(screen.getByText('Second review comment')).toBeInTheDocument();
  });

  it('should render empty list when no reviews', () => {
    render(<ReviewsList reviews={[]} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
