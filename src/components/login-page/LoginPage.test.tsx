import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import { userReducer, offersReducer } from '../../store/slices';
import { AuthorizationStatus } from '../../types';

const createMockStore = (authStatus: AuthorizationStatus = AuthorizationStatus.NoAuth) =>
  configureStore({
    reducer: {
      user: userReducer,
      offers: offersReducer,
    },
    preloadedState: {
      user: {
        authorizationStatus: authStatus,
        user: null,
      },
      offers: {
        city: 'Paris',
        offers: [],
        isOffersLoading: false,
      },
    },
  });

describe('LoginPage Component', () => {
  it('should render correctly', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should redirect to main page when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<div data-testid="main-page">Main Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should allow typing in email field', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@test.com');

    expect(emailInput).toHaveValue('test@test.com');
  });

  it('should allow typing in password field', async () => {
    const store = createMockStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'password123');

    expect(passwordInput).toHaveValue('password123');
  });

  it('should dispatch login action when form is submitted', async () => {
    const store = createMockStore();
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    await user.type(screen.getByPlaceholderText('Email'), 'test@test.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: 'Sign in' }));

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should have logo link to home page', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('should render random city link', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const cityLinks = screen.getAllByRole('link');
    const cityLink = cityLinks.find((link) =>
      ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].some((city) =>
        link.textContent?.includes(city)
      )
    );
    expect(cityLink).toBeInTheDocument();
  });
});
