import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReviewForm from './private-route';
import { offerReducer } from '../../store/slices';

const createMockStore = () =>
  configureStore({
    reducer: {
      offer: offerReducer,
    },
    preloadedState: {
      offer: {
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
        isOfferNotFound: false,
      },
    },
  });

describe('ReviewForm Component', () => {
  it('should render correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should have submit button disabled by default', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should allow selecting rating', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const fiveStarsInput = screen.getByTitle('perfect');
    await user.click(fiveStarsInput);

    const radioInput = document.getElementById('5-stars') as HTMLInputElement;
    expect(radioInput.checked).toBe(true);
  });

  it('should allow typing review text', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await user.type(textarea, 'This is a test review');

    expect(textarea).toHaveValue('This is a test review');
  });

  it('should enable submit button when rating and valid review are provided', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    await user.click(screen.getByTitle('perfect'));

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    const longReview = 'This is a test review that is long enough to meet the minimum character requirement of fifty characters.';
    await user.type(textarea, longReview);

    expect(screen.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
  });

  it('should keep submit disabled when review is too short', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    await user.click(screen.getByTitle('perfect'));

    const textarea = screen.getByPlaceholderText('Tell how was your stay, what you like and what can be improved');
    await user.type(textarea, 'Short review');

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });

  it('should render all rating options', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByTitle('perfect')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('terribly')).toBeInTheDocument();
  });

  it('should show help text', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <ReviewForm offerId="1" />
      </Provider>
    );

    expect(screen.getByText(/To submit review please make sure to set/)).toBeInTheDocument();
    expect(screen.getByText('50 characters')).toBeInTheDocument();
  });
});
