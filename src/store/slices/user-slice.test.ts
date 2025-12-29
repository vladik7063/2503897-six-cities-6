import { describe, it, expect } from 'vitest';
import userReducer from './user-slice';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { AuthorizationStatus, UserData } from '../../types';

const mockUser: UserData = {
  name: 'Test User',
  avatarUrl: 'img/avatar.jpg',
  isPro: false,
  email: 'test@test.com',
  token: 'test-token',
};

describe('userSlice', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  };

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const emptyAction = { type: '' };
      const result = userReducer(undefined, emptyAction);

      expect(result).toEqual(initialState);
    });

    it('should return default initial state with undefined state', () => {
      const result = userReducer(undefined, { type: '' });

      expect(result).toEqual(initialState);
    });
  });

  describe('checkAuthAction', () => {
    it('should set authorizationStatus to Auth and user on fulfilled', () => {
      const result = userReducer(initialState, checkAuthAction.fulfilled(mockUser, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(mockUser);
    });

    it('should set authorizationStatus to NoAuth and user to null on rejected', () => {
      const state = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: mockUser,
      };

      const result = userReducer(state, checkAuthAction.rejected(null, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });

  describe('loginAction', () => {
    it('should set authorizationStatus to Auth and user on fulfilled', () => {
      const result = userReducer(
        initialState,
        loginAction.fulfilled(mockUser, '', { email: 'test@test.com', password: 'password' })
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.Auth);
      expect(result.user).toEqual(mockUser);
    });

    it('should set authorizationStatus to NoAuth and user to null on rejected', () => {
      const result = userReducer(
        initialState,
        loginAction.rejected(null, '', { email: 'test@test.com', password: 'password' })
      );

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });

  describe('logoutAction', () => {
    it('should set authorizationStatus to NoAuth and user to null on fulfilled', () => {
      const state = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };

      const result = userReducer(state, logoutAction.fulfilled(undefined, '', undefined));

      expect(result.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(result.user).toBeNull();
    });
  });
});
