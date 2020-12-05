import React from 'react'
import { Route } from 'react-router-dom'
import DashBoard from '../../../pages/dashboard'

const AppRoutes = () => {
  return (
    <Route path="dashboard" element={<DashBoard />}>
      <Route path="/" element={<> Dash home</>} />
      <Route path="about" element={<> Dash About</>} />
      <Route path="test" element={<>Dash test </>} />
    </Route>
  )
}

const Authenticated = (): JSX.Element => {
  return <AppRoutes />
}

export default Authenticated
