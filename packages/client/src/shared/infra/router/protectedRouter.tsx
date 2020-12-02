/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  ...props
}) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />;
  }
  return <Route path={path} element={<Component />} />;
};

export default ProtectedRoute;
