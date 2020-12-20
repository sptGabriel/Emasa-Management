import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {ErrorBoundary, useErrorHandler} from 'react-error-boundary'
import {Route, Routes, Navigate} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import ErrorFallback from '../../components/ErrorFallBack'
import ESpinner from '../../components/Spinner'
import {useRootStore} from '../mobx'
import {PrivateRoute} from './privateRoute'

const DashRoutes: React.FC<{isAuth: boolean}> = observer(({isAuth}) => {
  return (
    <Routes>
      <PrivateRoute
        redirectTo="/"
        path="/"
        component={DashBoard}
        isAuth={isAuth}
      >
        <Route path="/" element={<div> Dash home</div>} />
        <Route path="about" element={<div> Dash About</div>} />
        <Route path="test" element={<div>Dash test </div>} />
        <Route path="*" element={<ErrorFallback />} />
      </PrivateRoute>
    </Routes>
  )
})
const AppRoutes: React.FC = observer(() => {
  const {authStore, currentUserStore} = useRootStore()
  const [loadingUser, setLoading] = useState(
    currentUserStore.accessToken ? true : false,
  )
  const handleError = useErrorHandler()
  useEffect(() => {
    if (currentUserStore.accessToken) {
      setTimeout(() => {
        currentUserStore
          .pullUser()
          .then(() => setLoading(false))
          .catch((error) => handleError(error))
      }, 2000)
    }
  }, [currentUserStore])
  return (
    <>
      {loadingUser ? (
        <div
          style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ESpinner />
        </div>
      ) : !(authStore.isAuth && currentUserStore.currentUser) ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <DashRoutes isAuth={authStore.isAuth} />
      )}
    </>
    //  <>
    //  {authStore.isAuth ? (
    //    <DashRoutes isAuth={authStore.isAuth} />
    //  ) : (
    //    <Routes>
    //      <Route path="/" element={<Login />} />
    //      <Route path="*" element={<Navigate to="/" replace />} />
    //    </Routes>
    //  )}
    //  </>
  )
})
const ApplicationRouter = observer(() => {
  const {appState} = useRootStore()
  return (
    <>
      {appState === 'error' ? (
        <ErrorFallback />
      ) : appState === 'fulfilled' ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutes />
        </ErrorBoundary>
      ) : (
        ''
      )}
    </>
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
