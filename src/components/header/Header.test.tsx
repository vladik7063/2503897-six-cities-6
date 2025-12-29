import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import { userReducer, favoritesReducer } from '../../store/slices';
import { AuthorizationStatus, UserData } from '../../types';

const mockUser = {
  name: 'Test User',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  email: 'test@test.com',
  token: 'test-token',
};

const createMockStore = (authStatus: AuthorizationStatus, user: UserData | null = null, favoritesCount = 0) =>
  configureStore({
    reducer: {
      user: userReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      user: {
        authorizationStatus: authStatus,
        user: user,
      },
      favorites: {
        favorites: Array.from({ length: favoritesCount }, () => ({
          id: '1',
          title: 'Test',
          type: 'apartment',
          price: 100,
          rating: 4,
          previewImage: 'img/test.jpg',
          city: { name: 'Paris', location: { latitude: 0, longitude: 0 } },
          location: { latitude: 0, longitude: 0 },
          isPremium: false,
          isFavorite: true,
        })),
        isFavoritesLoading: false,
      },
    },
  });

describe('Header Component', () => {
  it('should render correctly', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should render Sign in link when user is not authorized', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should render user email and Sign out when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth, mockUser);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render favorites count when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth, mockUser, 5);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should not render navigation when showNav is false', () => {
    const store = createMockStore(AuthorizationStatus.Auth, mockUser);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header showNav={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('test@test.com')).not.toBeInTheDocument();
  });

  it('should dispatch logout action when Sign out is clicked', async () => {
    const store = createMockStore(AuthorizationStatus.Auth, mockUser);
    const dispatchSpy = vi.spyOn(store, 'dispatch');
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    await user.click(screen.getByText('Sign out'));

    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('should have link to home page on logo', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
