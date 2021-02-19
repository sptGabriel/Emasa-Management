import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {NavLink} from 'react-router-dom'
import Pagination from '../../../shared/components/Pagination'
import {useRootStore} from '../../../shared/infra/mobx'
import {EditDepartament} from './styles'
import CheckBox from '../../../shared/components/CheckBox'
import UnselectCheckBox from '../../../shared/components/UnselectCheckBox'
import Modal from '../../../shared/components/Modal'
import {StyledInput} from '../../../shared/components/StyledInput'
import {DepartamentModel} from '../../../models/departamentModel'
import {ExportModal} from '../../../shared/components/Export'

const DepartamentColumnsName = ['Nome', 'Diretor', 'Sigla', 'Status', 'Ações']

const DepartamentEditSection: React.FC<{
  item: {active: boolean; depart: any}
  toggle: any
  setModal: any
}> = observer(({item, setModal, toggle}) => {
  const [edit, setEdit] = useState(new DepartamentModel({...item.depart}))
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
                  {item.depart.diretor.nome
                    ? 'Alterar diretor do departamento'
                    : 'Adicionar um diretor ao departamento:'}
                </label>
                <div className="grid">
                  {item.depart.diretor.nome ? (
                    <div>
                      <label>Diretor atual:</label>
                      <input
                        style={{pointerEvents: 'none', cursor: 'default'}}
                        defaultValue={item.depart.diretor.nome}
                        disabled
                      />
                    </div>
                  ) : null}
                  <div>
                    <label>
                      {item.depart.diretor.nome
                        ? 'Digite um número de matricula válido'
                        : ''}
                    </label>
                    <input
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          diretor: {
                            ...item.depart.diretor,
                            matricula: e.target.value,
                          },
                        })
                      }
                      value={edit.diretor.matricula}
                    />
                  </div>
                </div>
              </div>
            </StyledInput>
          </section>
          <section>
            <StyledInput>
              <div>
                <label>
                  {item.depart.gerente.nome
                    ? 'Alterar gerente do departamento'
                    : 'Adicionar um gerente ao departamento:'}
                </label>
                <div className="grid">
                  {item.depart.gerente.nome ? (
                    <div>
                      <label>Gerente atual:</label>
                      <input
                        style={{pointerEvents: 'none', cursor: 'default'}}
                        value={item.depart.gerente.nome}
                        disabled
                      />
                    </div>
                  ) : null}
                  <div>
                    <label>
                      {item.depart.gerente.nome
                        ? 'Digite um número de matricula válido'
                        : ''}
                    </label>
                    <input
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          gerente: {
                            ...item.depart.gerente,
                            matricula: e.target.value,
                          },
                        })
                      }
                      value={edit.gerente.matricula}
                    />
                  </div>
                </div>
              </div>
            </StyledInput>
          </section>
          <section>
            <StyledInput>
              <div>
                <label>
                  {item.depart.coordenador.nome
                    ? 'Alterar coordenador do departamento'
                    : 'Adicionar um coordenador ao departamento:'}
                </label>
                <div className="grid">
                  {item.depart.coordenador.nome ? (
                    <div>
                      <label>Coordenador atual:</label>
                      <input
                        style={{pointerEvents: 'none', cursor: 'default'}}
                        value={item.depart.coordenador.nome}
                        disabled
                      />
                    </div>
                  ) : null}
                  <div>
                    <label>
                      {item.depart.coordenador.nome
                        ? 'Digite um número de matricula válido'
                        : ''}
                    </label>
                    <input
                      value={edit.coordenador.matricula}
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          coordenador: {
                            ...item.depart.coordenador,
                            matricula: e.target.value,
                          },
                        })
                      }
                    />
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
  const [itemModalEdit, setModal]: any = useState({active: false, depart: null})
  const [exportData, setExport] = useState(false)

  function toggleModal(item: DepartamentModel) {
    if (!item) return
    setModal({active: !itemModalEdit.active, depart: item})
  }

  function loadData() {
    return departamentStore
      .getDepartamentsPage(limit, currentPage)
      .then((data) =>
        data
          .map((data) => ({...data, checked: false}))
          .sort((a, b) => {
            if (!a.status || !b.status) return 1
            return -1
          }),
      )
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
      <td className="w-full lg:w-auto p-3 text-center border border-b text-center block lg:table-cell relative lg:static">
        <button
          className="flex-initial cursor-pointer mr-4"
          onClick={() => toggleModal(item)}
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          className="flex-initial cursor-pointer mr-4"
          onClick={() => toggleModal(item)}
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <button className="flex-initial cursor-pointer" type="button">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </td>
    )
  }

  function renderDataList() {
    return data.map((item) => (
      <tr
        key={item.id}
        className={`${
          item.checked ? 'bg-blue-200 text-blue-800' : 'bg-white text-gray-600'
        } lg:hover:bg-blue-200 lg:hover:text-blue-800 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0`}
      >
        <td className="w-1 p-2 pr-5 pl-5 font-bold uppercase border hidden lg:table-cell">
          <CheckBox
            color={
              item.checked ? 'rgba(59, 130, 246, 1)' : 'rgba(52, 49, 76, 0.54)'
            }
            name={item.nome}
            value={item}
            tick={item.checked}
            onCheck={(e: any) => onCheckBoxChange(item.id, e.target.checked)}
          />
        </td>
        <td
          className="w-full lg:w-auto p-3 text-center border border-b text-center block lg:table-cell relative lg:static"
          style={{width: '20%'}}
        >
          {item.nome}
        </td>
        <td
          className="w-full lg:w-auto p-3 text-center border border-b text-center block lg:table-cell relative lg:static"
          style={{width: '25%'}}
        >
          {item.diretor.nome
            ? item.diretor.nome
            : 'Não tem um cadastro de diretor'}
        </td>
        <td
          className="w-full lg:w-auto p-3 text-center border border-b text-center block lg:table-cell relative lg:static"
          style={{width: '10%'}}
        >
          {item.sigla}
        </td>
        <td className="w-full lg:w-auto p-3 text-center border border-b text-center block lg:table-cell relative lg:static">
          <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-medium uppercase">
            Status
          </span>
          <span
            className={`rounded py-1 px-3 text-xs ${
              item.status ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
            }`}
          >
            {item.status ? 'Ativo' : 'Inativo'}
          </span>
        </td>
        {drawTDTools(item)}
      </tr>
    ))
  }

  useEffect(() => {
    loadData().then((item) => {
      console.log(item)
      return setData(item)
    })
    getTotal().then((value) => {
      setTotal(value)
      if (currentPage > value) setCurrentPage(value)
    })
  }, [])

  useEffect(() => {
    loadData().then((item) => setData(item))
    getTotal().then((value) => {
      setTotal(value)
      if (currentPage > value) setCurrentPage(value)
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
    <div style={{minHeight: 'calc(100% - 60px)'}}>
      <div className="relative mb-5 flex justify-between">
        <div className="w-80 relative flex items-center">
          <input
            type="text"
            className="py-2 px-4 w-80 pr-10 pl-5 rounded-full z-0 focus:shadow focus:outline-none border border-gray-300"
            placeholder="Pesquisar departamento..."
          />
          <div className="absolute translate-y-2/4 right-4 w-5 h-5">
            <svg
              className="w-5 h-5 text-gray-400 z-20 hover:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={() => setExport(!exportData)}
            type="button"
            className="bg-white hover:shadow-sm text-gray-500 py-1 px-3 rounded-lg inline-flex items-center mr-2 border-gray-300 border"
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span className="font-medium mr-1 text-lg">Exportar</span>
          </button>
          <NavLink
            end
            replace
            to="add"
            className="bg-blue-700 py-1 px-3 rounded-lg inline-flex items-center rounded-lg border-gray-200 border"
          >
            <svg
              className="w-6 h-6 mr-2 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-white font-medium mr-1 text-lg">
              Criar departamento
            </span>
          </NavLink>
        </div>
      </div>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="w-1 p-2 pr-5 pl-5 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden xl:table-cell">
              <UnselectCheckBox
                name="select-all"
                value="ALL"
                tick={!unselect && isAllSelected ? isAllSelected : unselect}
                onCheck={(e: any) => onCheckBoxChange('all', e.target.checked)}
              />
            </th>
            {DepartamentColumnsName.map((item, index) => (
              <th
                key={index}
                className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDataList()}</tbody>
        <tfoot>
          <tr>
            <td
              colSpan={6}
              className="w-full lg:w-auto text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
            >
              <Pagination
                isLoading={{loading, setLoad}}
                total={{total, setTotal}}
                page={{page: currentPage, setPage: setCurrentPage}}
                limit={{limit, setLimit}}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      <ExportModal
        setModal={setExport}
        toggle={() => setExport(!exportData)}
        active={exportData}
        tittle="Exportar departamentos"
        btActionName="Exportar"
        data={data}
      />
      {itemModalEdit.active ? (
        <DepartamentEditSection
          item={itemModalEdit}
          toggle={toggleModal}
          setModal={setModal}
        />
      ) : (
        ''
      )}
    </div>
  )
})
export default DepartamentPage
