import {observer} from 'mobx-react-lite'
import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import ErrorFallback from '../../components/ErrorFallBack'

const ApplicationRoutes: React.FC<{isLoggedIn: boolean}> = observer(
  ({isLoggedIn}) => {
    const routes = useRoutes([
      {
        path: '/login',
        element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login />,
      },
      {
        path: '/dashboard',
        element: isLoggedIn ? <DashBoard /> : <Navigate to="/login" />,
        children: [
          {path: '/', element: <div> Dash home</div>},
          {path: '/about', element: <div> Dash About</div>},
          {path: '/test', element: <div> Dash Test</div>},
          {path: '*', element: <ErrorFallback />},
        ],
      },
      {
        path: '/',
        element: <div>home</div>,
      },
      {path: '*', element: <ErrorFallback />},
    ])
    return routes
  },
)

export default ApplicationRoutes
