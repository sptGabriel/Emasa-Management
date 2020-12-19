import {observer} from 'mobx-react-lite'
import React, {useEffect} from 'react'
import {useErrorHandler} from 'react-error-boundary'
import {Route, Routes, Navigate} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import ErrorFallback from '../../components/ErrorFallBack'
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
const AppRoutes: React.FC<{isAuth: boolean}> = observer(({isAuth}) => {
  return (
    <>
      {isAuth ? (
        <DashRoutes isAuth={isAuth} />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  )
})
const Authenticated = observer(() => {
  const {appState, initApi, authStore} = useRootStore()
  //  useEffect(() => {
  //  if (appState !== 'fulfilled') initApi().catch((error) => handleError(error))
  //}, [])
  return (
    <>
      {appState === 'fulfilled' ? <AppRoutes isAuth={authStore.isAuth} /> : ''}
    </>
  )
})

export default Authenticated
