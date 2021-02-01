import React from 'react'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import {HorizontalDashBoard} from './horizontalDashBoard'
import {VerticalDashBoard} from './verticalDashBoard'

const DashBoard = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <>
      {layoutStore.layoutType === 'vertical' ? (
        <VerticalDashBoard />
      ) : (
        <HorizontalDashBoard />
      )}
    </>
  )
})

export default DashBoard
