import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
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
  const [data, setData] = useState<any[]>([])
  const handleAllChecked = () => {
    setData(
      data.map((depart) => {
        depart.isChecked = true
        return depart
      }),
    )
    console.log(data)
  }
  const handleChildrenChecked = (item: any) => {
    console.log(item, 'aaa')
    setData(
      data.map((depart) => {
        if (depart.id === item.id) {
          depart.isChecked = !item.isChecked
        }
        return depart
      }),
    )
  }
  useEffect(() => {
    departamentStore.getDepartamentsPage(limit, currentPage).then((data) =>
      setData(
        data.map((data) => {
          return {...data, isChecked: false}
        }),
      ),
    )
    departamentStore.getCount(limit).then((total) => setTotal(total))
  }, [])
  useEffect(() => {
    departamentStore.getDepartamentsPage(limit, currentPage).then((data) =>
      setData(
        data.map((data) => {
          return {...data, isChecked: false}
        }),
      ),
    )
    departamentStore.getCount(limit).then((total) => setTotal(total))
  }, [limit])
  useEffect(() => {
    departamentStore.getDepartamentsPage(limit, currentPage).then((data) =>
      setData(
        data.map((data) => {
          return {...data, isChecked: false}
        }),
      ),
    )
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
                  <input
                    type="checkbox"
                    value="checkedall"
                    onClick={handleAllChecked}
                  />
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
            {data.map((depart) => {
              return (
                <tr key={depart.id}>
                  <td className="paddingCheckbox">
                    <span className="root">
                      <input
                        type="checkbox"
                        onClick={() => handleChildrenChecked(depart)}
                        value={depart}
                        checked={depart.isChecked}
                      />
                    </span>
                  </td>
                  <td>{depart.nome}</td>
                  <td>{depart.diretor}</td>
                  <td>{depart.gerente}</td>
                  <td>{depart.coordenador}</td>
                  <td>{depart.criado}</td>
                </tr>
              )
            })}
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
