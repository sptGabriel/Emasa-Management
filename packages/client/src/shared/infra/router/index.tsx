import {observer} from 'mobx-react-lite'
import React, {Suspense, useEffect, useState} from 'react'
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary'
import {Route, Routes, Navigate} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import ErrorFallback from '../../components/ErrorFallBack'
import ESpinner from '../../components/Spinner'
import {useRootStore} from '../mobx'
import {PrivateRoute} from './privateRoute'

const ApplicationRouter: React.FC = observer(() => {
  const {authStore} = useRootStore()
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<div>home</div>} />
      <PrivateRoute
        redirectTo="/"
        path="/dashboard"
        component={DashBoard}
        isAuth={authStore.isAuth}
      >
        <Route path="/" element={<div> Dash home</div>} />
        <Route path="about" element={<div> Dash About</div>} />
        <Route path="test" element={<div>Dash test </div>} />
        <Route path="*" element={<ErrorFallback />} />
      </PrivateRoute>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
})

export default ApplicationRouter

//  const ApplicationRouter = observer(() => {
//  const [error, setError] = useState(null)
//  const {appState, initApi, authStore} = useRootStore()
//  const handleError = useErrorHandler()
//  useEffect(() => {
//    if (appState !== 'fulfilled') initApi().catch((error) => handleError(error))
//  }, [])
//  return (
//    <>
//      {appState === 'fulfilled' ? <AppRoutes isAuth={authStore.isAuth} /> : ''}
//    </>
//  )
//  })
