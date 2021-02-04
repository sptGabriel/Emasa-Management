import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {DepartamentMain, ResponsiveTable, TableContent} from './styles'
import CheckBox from '../../../shared/components/CheckBox'
import Pagination from '../../../shared/components/Pagination'
import {useRootStore} from '../../../shared/infra/mobx'

const DepartamentPage: React.FC = observer(() => {
  const {departamentStore} = useRootStore()
  return (
    <Pagination
      total={departamentStore.total}
      page={1}
      perPage={10}
      callData={departamentStore.getDepartamentsPage}
    />
  )
})
export default DepartamentPage
