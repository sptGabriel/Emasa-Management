import {observer} from 'mobx-react-lite'
import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import EditProfile from '../../../pages/dashboard/accounts/edit'
import ErrorFallback from '../../components/ErrorBoundary/ErrorFallBack'
import Accounts from '../../../pages/dashboard/accounts'

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
          {
            path: '/',
            element: <EditProfile />,
          },
          {
            path: '/accounts',
            element: <Accounts />,
            children: [
              {
                path: '/edit',
                element: <EditProfile />,
              },
              {
                path: '/password/change',
                element: <EditProfile />,
              },
              {
                path: '/login_activity',
                element: <EditProfile />,
              },
            ],
          },
          {path: '/about', element: <div> Dash About</div>},
          {
            path: '/test',
            element: <div>test</div>,
          },
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
