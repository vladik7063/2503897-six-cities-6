import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('should contain keyframes animation style', () => {
    const { container } = render(<Spinner />);

    const styleTag = container.querySelector('style');
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain('@keyframes spin');
  });
});
