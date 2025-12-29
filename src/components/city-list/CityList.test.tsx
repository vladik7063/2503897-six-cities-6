import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CityList from './CityList';

describe('CityList Component', () => {
  const mockOnCityChange = vi.fn();

  beforeEach(() => {
    mockOnCityChange.mockClear();
  });

  it('should render correctly with all cities', () => {
    render(<CityList activeCity="Paris" onCityChange={mockOnCityChange} />);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getByText('Brussels')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByText('Dusseldorf')).toBeInTheDocument();
  });

  it('should highlight active city', () => {
    render(<CityList activeCity="Amsterdam" onCityChange={mockOnCityChange} />);

    const amsterdamLink = screen.getByText('Amsterdam').closest('a');
    expect(amsterdamLink).toHaveClass('tabs__item--active');

    const parisLink = screen.getByText('Paris').closest('a');
    expect(parisLink).not.toHaveClass('tabs__item--active');
  });

  it('should call onCityChange when city is clicked', async () => {
    const user = userEvent.setup();
    render(<CityList activeCity="Paris" onCityChange={mockOnCityChange} />);

    await user.click(screen.getByText('Amsterdam'));

    expect(mockOnCityChange).toHaveBeenCalledTimes(1);
    expect(mockOnCityChange).toHaveBeenCalledWith('Amsterdam');
  });

  it('should call onCityChange with correct city name for each city', async () => {
    const user = userEvent.setup();
    render(<CityList activeCity="Paris" onCityChange={mockOnCityChange} />);

    await user.click(screen.getByText('Cologne'));
    expect(mockOnCityChange).toHaveBeenLastCalledWith('Cologne');

    await user.click(screen.getByText('Brussels'));
    expect(mockOnCityChange).toHaveBeenLastCalledWith('Brussels');
  });
});
