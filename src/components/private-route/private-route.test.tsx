import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './private-route';
import { userReducer } from '../../store/slices';
import { AuthorizationStatus } from '../../types';

const createMockStore = (authStatus: AuthorizationStatus) =>
  configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: {
      user: {
        authorizationStatus: authStatus,
        user: null,
      },
    },
  });

describe('PrivateRoute Component', () => {
  it('should render children when user is authorized', () => {
    const store = createMockStore(AuthorizationStatus.Auth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div data-testid="private-content">Private Content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('private-content')).toBeInTheDocument();
    expect(screen.getByText('Private Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authorized', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div data-testid="private-content">Private Content</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('private-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('should render Spinner when authorization status is unknown', () => {
    const store = createMockStore(AuthorizationStatus.Unknown);

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/private']}>
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <div data-testid="private-content">Private Content</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('private-content')).not.toBeInTheDocument();
    expect(container.querySelector('style')).toBeInTheDocument();
  });
});
