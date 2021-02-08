import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {MdEdit} from 'react-icons/md'
import {CgArrowLongRight} from 'react-icons/cg'
import Pagination from '../../../shared/components/Pagination'
import {useRootStore} from '../../../shared/infra/mobx'
import {
  DepartamentMain,
  EditDepartament,
  ResponsiveTable,
  TableContent,
  TR,
} from './styles'
import CheckBox from '../../../shared/components/CheckBox'
import {TableToolsHeader} from '../../../shared/components/TableToolsHeader'
import UnselectCheckBox from '../../../shared/components/UnselectCheckBox'
import Modal from '../../../shared/components/Modal'

const DepartamentPage: React.FC = observer(() => {
  const {departamentStore} = useRootStore()
  const [total, setTotal] = useState(0)
  const [loading, setLoad] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [data, setData] = useState<any[]>([])
  const [isAllSelected, setSelected] = useState(false)
  const [totalSelected, setTotalSelected] = useState(
    data.filter((item) => item.checked).length,
  )
  const [unselect, setUnselect] = useState(false)
  const [itemModalEdit, setModal]: any = useState({active: false, key: null})

  function toggleModal(key: string) {
    if (!key) return
    setModal({active: !itemModalEdit.active, key})
  }

  function loadData() {
    return departamentStore
      .getDepartamentsPage(limit, currentPage)
      .then((data) => data.map((data) => ({...data, checked: false})))
  }

  function getTotal() {
    return departamentStore.getCount(limit).then((total) => total)
  }

  function onCheckBoxChange(key: any, checked: any) {
    let isAllChecked = key === 'all' && checked
    let isAllUnChecked = key === 'all' && !checked
    const checkList = data.map((depart) => {
      if (isAllChecked || depart.id === key) return {...depart, checked}
      if (isAllUnChecked) return {...depart, checked: false}
      return depart
    })
    let isAllSelected =
      checkList.findIndex((item) => item.checked === false) === -1 ||
      isAllChecked
    setData(checkList)
    setSelected(isAllSelected)
  }

  function drawTDTools(key: string) {
    return (
      <td>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <button
            style={{
              flex: '0 0 auto',
              padding: 12,
              overflow: 'visible',
              cursor: 'pointer',
            }}
            onClick={() => toggleModal(key)}
            type="button"
          >
            <MdEdit size={18} />
          </button>
          <button
            style={{flex: '0 0 auto', padding: 12, overflow: 'visible'}}
            type="button"
          >
            <CgArrowLongRight size={18} />
          </button>
        </div>
      </td>
    )
  }

  function renderDataList() {
    return data.map((item) => (
      <TR hasHover={1} key={item.id} selected={item.checked}>
        <td className="paddingCheckbox">
          <span className="root">
            <CheckBox
              name={item.nome}
              value={item}
              tick={item.checked}
              onCheck={(e: any) => onCheckBoxChange(item.id, e.target.checked)}
            />
          </span>
        </td>
        <td>{item.nome}</td>
        <td>{item.diretor}</td>
        <td>{item.gerente}</td>
        <td>{item.coordenador}</td>
        <td>{item.criado}</td>
        {drawTDTools(item.id)}
      </TR>
    ))
  }

  function renderEditModal() {
    return (
      <Modal
        isShowing={itemModalEdit.active && itemModalEdit.key}
        hide={toggleModal}
        hideWithOutSide={setModal}
        tittle="Editar departamento"
      >
        <EditDepartament flexColumn>
          <div className="modal-body">body</div>
        </EditDepartament>
      </Modal>
    )
  }

  useEffect(() => {
    loadData().then((data) => setData(data))
    getTotal().then((value) => setTotal(value))
  }, [])

  useEffect(() => {
    loadData().then((item) => setData(item))
    getTotal().then((value) => {
      if (currentPage > value) setCurrentPage(value)
      setTotal(value)
    })
    setSelected(false)
  }, [limit, currentPage])

  useEffect(() => {
    const totalSelected: any[] = data.filter((item) => item.checked)
    setTotalSelected(totalSelected.length)
    if (totalSelected.length >= 1 && totalSelected.length < limit) {
      setUnselect(true)
    } else {
      setUnselect(false)
    }
  }, [data])

  return (
    <DepartamentMain>
      <TableContent>
        <div
          style={{
            background: '#fff',
            display: 'flex',
            width: '100%',
            minHeight: '64px',
            padding: '0 24px',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 2,
            position: 'relative',
            boxShadow:
              totalSelected > 0
                ? '0px 2px 1px -1px rgb(0 0 0 / 6%), 0px 1px 1px 0px rgb(0 0 0 / 4%), 0px 1px 3px 0px rgb(0 0 0 / 4%)'
                : 'none',
          }}
        >
          <TableToolsHeader
            totalSelected={totalSelected}
            justify="space-between"
            align="center"
            sectionName="Todos os departamentos"
          />
        </div>
        <ResponsiveTable>
          <thead>
            <TR hasHover={0} className="tr-head">
              <th
                style={{padding: '0 0 0 4px !important'}}
                className="paddingCheckbox"
              >
                <span className="root">
                  <UnselectCheckBox
                    name="select-all"
                    value="ALL"
                    tick={!unselect && isAllSelected ? isAllSelected : unselect}
                    onCheck={(e: any) =>
                      onCheckBoxChange('all', e.target.checked)
                    }
                  />
                </span>
              </th>
              <th>Nome</th>
              <th>Diretor</th>
              <th>Gerente</th>
              <th>Coordenador</th>
              <th>Data de criação</th>
              <th>
                <span />
              </th>
            </TR>
          </thead>
          <tbody>{renderDataList()}</tbody>
        </ResponsiveTable>
        <Pagination
          isLoading={{loading, setLoad}}
          total={{total, setTotal}}
          page={{page: currentPage, setPage: setCurrentPage}}
          limit={{limit, setLimit}}
        />
      </TableContent>
      {itemModalEdit.active ? renderEditModal() : ''}
    </DepartamentMain>
  )
})
export default DepartamentPage
