import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Outlet} from 'react-router-dom'

const DepartamentPage: React.FC = observer(() => {
  return (
    <div style={{height: '100%', padding: '0 10px'}}>
      <Outlet />
    </div>
  )
})

export default DepartamentPage
