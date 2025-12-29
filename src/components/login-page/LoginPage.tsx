import React, { useState, FormEvent, useMemo } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { selectAuthorizationStatus } from '../../store/selectors';
import { loginAction } from '../../store/api-actions';
import { changeCity } from '../../store/slices';
import { AuthorizationStatus } from '../../types';
import { CITIES } from '../../const/cities';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  const randomCity = useMemo(
    () => CITIES[Math.floor(Math.random() * CITIES.length)],
    []
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (email && password) {
      dispatch(loginAction({ email, password }));
    }
  };

  const handleCityClick = () => {
    dispatch(changeCity(randomCity.name));
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>

          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                className="locations__item-link"
                to="/"
                onClick={handleCityClick}
              >
                <span>{randomCity.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
