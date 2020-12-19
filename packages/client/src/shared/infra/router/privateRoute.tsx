import React from 'react'
import {Route, Navigate} from 'react-router-dom'

export const PrivateRoute = ({
  component: Component,
  redirectTo,
  isAuth,
  path,
  ...props
}: any) => {
  if (!isAuth) {
    return <Navigate to={redirectTo} />
  }
  return <Route path={path} element={<Component />} />
}