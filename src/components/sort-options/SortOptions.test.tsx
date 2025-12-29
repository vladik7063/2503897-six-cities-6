import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortOptions from './SortOptions';

describe('SortOptions Component', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render correctly with active option', () => {
    render(<SortOptions activeSortOption="Popular" onChange={mockOnChange} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should show all sort options when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<SortOptions activeSortOption="Popular" onChange={mockOnChange} />);

    const sortingType = container.querySelector('.places__sorting-type');
    await user.click(sortingType!);

    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should toggle dropdown when clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<SortOptions activeSortOption="Popular" onChange={mockOnChange} />);

    const dropdown = container.querySelector('.places__options');
    const sortingType = container.querySelector('.places__sorting-type');
    expect(dropdown).not.toHaveClass('places__options--opened');

    await user.click(sortingType!);
    expect(dropdown).toHaveClass('places__options--opened');

    await user.click(sortingType!);
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should call onChange with selected option', async () => {
    const user = userEvent.setup();
    const { container } = render(<SortOptions activeSortOption="Popular" onChange={mockOnChange} />);

    const sortingType = container.querySelector('.places__sorting-type');
    await user.click(sortingType!);
    await user.click(screen.getByText('Price: low to high'));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('Price: low to high');
  });

  it('should close dropdown after selecting option', async () => {
    const user = userEvent.setup();
    const { container } = render(<SortOptions activeSortOption="Popular" onChange={mockOnChange} />);

    const sortingType = container.querySelector('.places__sorting-type');
    await user.click(sortingType!);
    await user.click(screen.getByText('Price: high to low'));

    const dropdown = container.querySelector('.places__options');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should highlight active option in dropdown', () => {
    const { container } = render(<SortOptions activeSortOption="Top rated first" onChange={mockOnChange} />);

    const activeOption = container.querySelector('.places__option--active');
    expect(activeOption).toBeInTheDocument();
    expect(activeOption?.textContent).toBe('Top rated first');
  });
});
