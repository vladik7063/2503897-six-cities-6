import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('MainEmpty Component', () => {
  it('should render correctly with city name', () => {
    render(<MainEmpty city="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/)).toBeInTheDocument();
  });

  it('should display correct city in description', () => {
    render(<MainEmpty city="Amsterdam" />);

    expect(screen.getByText(/in Amsterdam/)).toBeInTheDocument();
  });

  it('should render empty container structure', () => {
    const { container } = render(<MainEmpty city="Cologne" />);

    expect(container.querySelector('.cities__places-container--empty')).toBeInTheDocument();
    expect(container.querySelector('.cities__no-places')).toBeInTheDocument();
  });
});
