import React from 'react'
import { Outlet, Route } from 'react-router-dom'

const LayoutDashBoard = () => {
  return (
    <div>
      <div> Header</div>
      <div>
        <Outlet />
      </div>
      <div> footer </div>
    </div>
  )
}

const AppRoutes = () => {
  return (
    <Route path="dashboard" element={<LayoutDashBoard />}>
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
