import {observer} from 'mobx-react-lite'
import React from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'
import Login from '../../../pages/login'
import EditProfile from '../../../pages/dashboard/accounts/edit'
import ErrorFallback from '../../components/ErrorBoundary/ErrorFallBack'
import Accounts from '../../../pages/dashboard/accounts'
import ChangePassword from '../../../pages/dashboard/accounts/changePassword'
import ChangeAddress from '../../../pages/dashboard/accounts/changeAddress'
import UserActivity from '../../../pages/dashboard/accounts/loginActivity'
import DepartamentPage from '../../../pages/dashboard/departaments'
import DepartamentTable from '../../../pages/dashboard/departaments/DepartamentTable'
import NewDepartament from '../../../pages/dashboard/departaments/addNewDepartament'
import DepartamentViewer from '../../../pages/dashboard/departaments/viewPage'

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
            path: '/departaments',
            element: <DepartamentPage />,
            children: [
              {
                path: '/',
                element: <DepartamentTable />,
              },
              {
                path: ':departamentId',
                element: <DepartamentViewer />,
              },
            ],
          },
          {
            path: '/accounts',
            element: <Accounts />,
            children: [
              {
                path: '/',
                element: <EditProfile />,
              },
              {
                path: '/address/change',
                element: <ChangeAddress />,
              },
              {
                path: '/password/change',
                element: <ChangePassword />,
              },
              {
                path: '/login_activity',
                element: <UserActivity />,
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
