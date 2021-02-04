import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import Pagination from '../../../shared/components/Pagination'
import {useRootStore} from '../../../shared/infra/mobx'
import {DepartamentModel} from '../../../models/departamentModel'
import {DepartamentMain, ResponsiveTable, TableContent} from './styles'

const DepartamentPage: React.FC = observer(() => {
  const {departamentStore} = useRootStore()
  const [total, setTotal] = useState(0)
  const [departSec, setSec] = useState({
    total: 0,
    data: [] as any,
    page: 1,
    perPage: 10,
    loading: false,
  })
  useEffect(() => {
    departamentStore
      .getCount(departSec.perPage)
      .then((total) => setSec({...departSec, total}))
  }, [])
  return (
    <DepartamentMain>
      <h1>departament page </h1>
      <TableContent>
        <ResponsiveTable>
          <thead>
            <tr>
              <th className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </th>
              <th>Nome</th>
              <th>Diretor</th>
              <th>Gerente</th>
              <th>Coordenador</th>
              <th>Criado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </td>
              <td>Ti</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
            <tr>
              <td className="paddingCheckbox">
                <span className="root">
                  <input type="checkbox" />
                </span>
              </td>
              <td>Ti</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
              <td>Test</td>
            </tr>
          </tbody>
        </ResponsiveTable>
      </TableContent>
      <Pagination
        isLoading={departSec.loading}
        total={departSec.total}
        page={departSec.page}
        perPage={departSec.perPage}
      />
    </DepartamentMain>
  )
})
export default DepartamentPage
