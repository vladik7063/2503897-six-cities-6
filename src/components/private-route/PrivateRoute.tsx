import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  isAuthorized: boolean;
  children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthorized, children }) => {
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
