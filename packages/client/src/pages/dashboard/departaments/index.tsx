import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Outlet} from 'react-router-dom'

const DepartamentPage: React.FC = observer(() => {
  return (
    <div style={{padding: '0 10px', height: '100%'}}>
      <Outlet />
    </div>
  )
})

export default DepartamentPage
