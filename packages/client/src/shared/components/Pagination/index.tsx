import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'

const Pagination: React.FC<{
  perPage: number
  page: number
  total: number
  callData: (perPage: number, page: number) => any
}> = observer(({children, page, perPage, callData, total}) => {
  const [pagination, setPagination] = useState({
    perPage,
    page,
    data: [] as any,
    total,
  })
  useEffect(() => {
    callData(pagination.perPage, pagination.page).then((data: any) => {
      setPagination({...pagination, data})
      console.log(pagination, 'pagination')
    })
  }, [perPage, page])
  return <div>{children}</div>
})

export default Pagination
