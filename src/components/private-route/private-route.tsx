import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../types';
import Spinner from '../spinner';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Spinner />;
  }

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
