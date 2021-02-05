import React, {useEffect, useState} from 'react'
import {observer, useStaticRendering} from 'mobx-react-lite'
import Pagination from '../../../shared/components/Pagination'
import {useRootStore} from '../../../shared/infra/mobx'
import {DepartamentModel} from '../../../models/departamentModel'
import {DepartamentMain, ResponsiveTable, TableContent} from './styles'

const DepartamentPage: React.FC = observer(() => {
  const {departamentStore} = useRootStore()
  const [total, setTotal] = useState(0)
  const [loading, setLoad] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState<DepartamentModel[]>([])
  useEffect(() => {
    departamentStore
      .getDepartamentsPage(limit, currentPage)
      .then((data) => setData(data))
    departamentStore.getCount(limit).then((total) => setTotal(total))
  }, [])
  useEffect(() => {
    departamentStore
      .getDepartamentsPage(limit, currentPage)
      .then((data) => setData(data))
    departamentStore.getCount(limit).then((total) => setTotal(total))
  }, [limit])
  useEffect(() => {
    departamentStore
      .getDepartamentsPage(limit, currentPage)
      .then((data) => setData(data))
  }, [currentPage])
  return (
    <DepartamentMain>
      <h1>departament page </h1>
      <TableContent>
        <ResponsiveTable>
          <thead>
            <tr className="tr-head">
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
            {data.map((depart) => (
              <tr key={depart.id}>
                <td className="paddingCheckbox">
                  <span className="root">
                    <input type="checkbox" />
                  </span>
                </td>
                <td>{depart.nome}</td>
                <td>{depart.diretor}</td>
                <td>{depart.gerente}</td>
                <td>{depart.coordenador}</td>
                <td>{depart.criado}</td>
              </tr>
            ))}
          </tbody>
        </ResponsiveTable>
        <Pagination
          isLoading={{loading, setLoad}}
          total={{total, setTotal}}
          page={{page: currentPage, setPage: setCurrentPage}}
          limit={{limit, setLimit}}
        />
      </TableContent>
    </DepartamentMain>
  )
})
export default DepartamentPage
