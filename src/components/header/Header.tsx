import React, { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectAuthorizationStatus, selectUser, selectFavoriteCount } from '../../store/selectors';
import { AuthorizationStatus } from '../../types';
import { logoutAction } from '../../store/api-actions';

interface HeaderProps {
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const user = useSelector(selectUser);
  const favoriteCount = useSelector(selectFavoriteCount);

  const handleLogoutClick = useCallback((evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  }, [dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link header__logo-link--active" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          {showNav && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                        <div className="header__avatar-wrapper user__avatar-wrapper" style={{ backgroundImage: user?.avatarUrl ? `url(${user.avatarUrl})` : undefined }}>
                        </div>
                        <span className="header__user-name user__name">{user?.email}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogoutClick}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/login">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;
