import {observer} from 'mobx-react-lite'
import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import {OutletWrapper} from '../../../pages/dashboard/verticalDashBoard'
import Login from '../../../pages/login'
import EditProfile from '../../../pages/profileEdit'
import BreadCrumb from '../../components/BreadCrumb'
import ErrorFallback from '../../components/ErrorBoundary/ErrorFallBack'

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
            element: (
              <OutletWrapper>
                <BreadCrumb />
                <EditProfile />
              </OutletWrapper>
            ),
          },
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
