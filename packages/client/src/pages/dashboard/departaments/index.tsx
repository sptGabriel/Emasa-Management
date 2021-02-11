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
import {StyledInput} from '../../../shared/components/StyledInput'
import {DepartamentModel} from '../../../models/departamentModel'

const DepartamentEditSection: React.FC<{
  item: {active: boolean; depart: any}
  toggle: any
  setModal: any
}> = observer(({item, setModal, toggle}) => {
  const [edit, setEdit] = useState(new DepartamentModel({...item.depart}))
  if (!item.active || !item.depart) return null
  return (
    <Modal
      isShowing={item.active && item.depart}
      hide={toggle}
      hideWithOutSide={setModal}
      tittle="Editar departamento"
    >
      <EditDepartament>
        <div className="modal-body">
          <section>
            <StyledInput>
              <div>
                <label>Alterar nome do departamento</label>
                <div>
                  <input
                    name="depart_nome"
                    id="depart_nome"
                    defaultValue={item.depart.nome}
                    value={edit.nome}
                    onChange={(e) => setEdit({...edit, nome: e.target.value})}
                  />
                </div>
              </div>
            </StyledInput>
            <StyledInput>
              <div>
                <label>Alterar sigla do departamento</label>
                <div>
                  <input
                    name="depart_sigla"
                    id="depart_sigla"
                    defaultValue={item.depart.sigla}
                    value={edit.sigla}
                    onChange={(e) => setEdit({...edit, sigla: e.target.value})}
                  />
                </div>
              </div>
            </StyledInput>
          </section>
          <section>
            <StyledInput>
              <div>
                <label>
                  {item.depart.diretor
                    ? 'Alterar diretor do departamento'
                    : 'Adicionar um diretor ao departamento:'}
                </label>
                <div className="grid">
                  {item.depart.diretor ? (
                    <div>
                      <label>Diretor atual:</label>
                      <input
                        style={{
                          borderColor: 'rgb(0, 107, 166)',
                          width: item.depart.diretor
                            ? 'auto'
                            : '30% !important',
                        }}
                        value={item.depart.nome}
                        disabled
                      />
                    </div>
                  ) : null}
                  <div>
                    {/* <label>Digite um número de matricula válido</label> */}
                    <input disabled />
                  </div>
                </div>
              </div>
            </StyledInput>
          </section>
          <section>
            <StyledInput>
              <div>
                <label>Alterar gerente do departamento:</label>
                <div className="grid">
                  <div>
                    <label>Gerente atual:</label>
                    <input
                      style={{borderColor: 'rgb(0, 107, 166)'}}
                      value={item.depart.nome}
                      disabled
                    />
                  </div>
                  <div>
                    <label>Digite um número de matricula válido:</label>
                    <input value={item.depart.nome} disabled />
                  </div>
                </div>
              </div>
            </StyledInput>
          </section>
          <section>
            <StyledInput>
              <div>
                <label>Alterar diretor do coordenador:</label>
                <div className="grid">
                  <div>
                    <label>Coordenador atual:</label>
                    <input
                      value={item.depart.nome}
                      disabled
                      style={{borderColor: 'rgb(0, 107, 166)'}}
                    />
                  </div>
                  <div>
                    <label>Digite um número de matricula válido:</label>
                    <input value={item.depart.nome} disabled />
                  </div>
                </div>
              </div>
            </StyledInput>
          </section>
        </div>
        <footer className="modal-footer">
          <button type="button">Alterar Departamento</button>
        </footer>
      </EditDepartament>
    </Modal>
  )
})

const DepartamentPage: React.FC = observer(() => {
  const {departamentStore, AxiosStore} = useRootStore()
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
  const [itemModalEdit, setModal]: any = useState({active: false, depart: null})

  function toggleModal(item: DepartamentModel) {
    if (!item) return
    setModal({active: !itemModalEdit.active, depart: item})
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

  function drawTDTools(item: DepartamentModel) {
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
            onClick={() => toggleModal(item)}
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
        <td style={{width: '20%'}}>{item.nome}</td>
        <td style={{width: '20%'}}>
          {item.diretor ? item.diretor : 'Não tem um cadastro de diretor'}
        </td>
        <td style={{width: '10%'}}>{item.sigla}</td>
        <td style={{width: '20%'}}>{item.criado}</td>
        {drawTDTools(item)}
      </TR>
    ))
  }

  function RenderEditModal() {
    return (
      <Modal
        isShowing={itemModalEdit.active && itemModalEdit.key}
        hide={toggleModal}
        hideWithOutSide={setModal}
        tittle="Editar departamento"
      >
        <EditDepartament>
          <div className="modal-body">
            <section>
              <StyledInput>
                <div>
                  <label>Alterar nome do departamento</label>
                  <div>
                    <input />
                  </div>
                </div>
              </StyledInput>
              <StyledInput>
                <div>
                  <label>Alterar sigla do departamento</label>
                  <div>
                    <input />
                  </div>
                </div>
              </StyledInput>
            </section>
            <section>
              <StyledInput>
                <label>Deseja alterar o diretor?</label>
                <div>
                  <input />
                </div>
              </StyledInput>
            </section>
            <section>
              <div>
                <label>Deseja alterar o gerente?</label>
              </div>
            </section>
            <section>
              <div>
                <label>Deseja alterar o coordenador?</label>
              </div>
            </section>
          </div>
        </EditDepartament>
      </Modal>
    )
  }

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
              <th>Sigla</th>
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
      <DepartamentEditSection
        item={itemModalEdit}
        toggle={toggleModal}
        setModal={setModal}
      />
    </DepartamentMain>
  )
})
export default DepartamentPage
