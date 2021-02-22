import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {TiArrowSortedDown} from 'react-icons/ti'
import {useRootStore} from '../../../shared/infra/mobx'
import {DepartamentModel} from '../../../models/departamentModel'
import userAvatar from '../../../assets/logo_emasa.png'
import {UserModel} from '../../../models/userModel'
import {createBackgroundImage} from '../../../shared/utils/createCloudinaryBG'

interface EmployeeTable {
  loading: boolean
  total: number
  currentPage: number
  limit: number
}

const Employees: React.FC<{employees: UserModel[]}> = ({employees}) => {
  const [state, setState] = useState({limit: 10} as EmployeeTable)
  function getTotal() {
    const length = employees.length || 1
    if (state.currentPage > length) setState({...state, currentPage: length})
    return setState({...state, total: employees.length / state.limit})
  }

  useEffect(() => {
    getTotal()
  }, [])

  function renderDataList() {
    return employees.map((item: any) => {
      return (
        <tr
          key={item.id}
          className={`${
            item.checked
              ? 'bg-blue-200 text-blue-800'
              : 'bg-white text-gray-600'
          } lg:hover:bg-blue-200 lg:hover:text-blue-800 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0`}
        >
          <td className="w-full lg:w-auto py-3 px-2 border border-b text-left block lg:table-cell relative lg:static">
            <div className="flex items-center">
              <div
                style={{width: '40px', height: '40px', borderRadius: '50%'}}
                className="overflow-hidden relative flex items-center"
              >
                <img
                  src={
                    item.avatar
                      ? createBackgroundImage(item.avatar)
                      : userAvatar
                  }
                  className="absolute top-0 left-0 w-full h-full"
                  alt="Logo"
                />
              </div>
              <span className="ml-2 font-medium text-gray-800">
                {item.name}
              </span>
            </div>
          </td>
          <td
            className="w-full lg:w-auto py-1 px-2 border border-b text-left block lg:table-cell relative lg:static"
            style={{width: '25%'}}
          >
            {item.position}
          </td>
          <td
            className="w-full lg:w-auto py-1 px-2 border border-b text-left block lg:table-cell relative lg:static"
            style={{width: '25%'}}
          >
            {item.email || 'Não possui'}
          </td>
          <td
            className="w-full lg:w-auto py-1 px-2 border border-b text-left block lg:table-cell relative lg:static"
            style={{width: '10%'}}
          >
            any
          </td>
        </tr>
      )
    })
  }

  return (
    <table className="border-collapse w-full mt-8">
      <thead>
        <tr>
          {['Nome', 'Cargo', 'Email', 'Status'].map((item, index) => (
            <th
              key={index}
              className="text-sm py-2 px-2 font-semibold bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell text-left"
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
            colSpan={3}
            className="w-full lg:w-auto text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static"
          >
            {/* <Pagination
                isLoading={{
                  loading: state.loading,
                  setLoad: () => setState({...state, loading: !state}),
                }}
                total={{
                  total: state.total,
                  setTotal: (total: number) => setState({...state, total}),
                }}
                page={{
                  page: state.currentPage,
                  setPage: (currentPage: number) =>
                    setState({...state, currentPage}),
                }}
                limit={{
                  limit: state.limit,
                  setLimit: (limit: number) => setState({...state, limit}),
                }}
              /> */}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

const LogsPage = () => {
  return <p>logs</p>
}

const DepartamentViewer = observer(() => {
  const [tabs, setTab] = useState({
    details: true,
    logs: false,
  })
  const {departamentStore} = useRootStore()
  const {departamentId} = useParams()
  const [departament, setDepartament] = useState(new DepartamentModel())
  const [expandDetails, setExpandOn] = useState(true)
  function tabHanlder(value: string) {
    switch (value) {
      case 'details':
        return setTab({details: true, logs: false})
      case 'logs':
        return setTab({details: false, logs: true})
      default:
        return setTab({details: true, logs: false})
    }
  }

  useEffect(() => {
    departamentStore.byID(departamentId).then((res) => setDepartament(res.data))
  }, [])

  function renderDetails() {
    return (
      <div
        style={{bottom: '-10px'}}
        className="sticky self-start h-full flex pb-14"
      >
        <div>
          <div className="info">
            <h1 className="font-roboto font-semibold text-2xl pt-3 pb-2">
              {departament ? departament.nome : ''}
            </h1>
          </div>
          <div className="pb-2 details relative">
            <div
              style={{boxShadow: expandDetails ? 'inset 0 -1px #e3e8ee' : ''}}
              className="py-2"
            >
              <button
                type="button"
                onClick={() => setExpandOn(!expandDetails)}
                className="font-semibold tracking-wider text-base flex items-center"
              >
                <span className="mr-1 text-gray-500">
                  {expandDetails ? (
                    <TiArrowSortedDown size={24} />
                  ) : (
                    <TiArrowSortedDown
                      size={24}
                      style={{transform: 'rotate(270deg)'}}
                    />
                  )}
                </span>
                <span className="text-gray-800">Detalhes</span>
              </button>
            </div>
            {expandDetails ? (
              <div className="expand pt-4">
                <div className="created_at">
                  <h1 className="font-normal text-gray-500 tracking-wide">
                    Data de criação
                  </h1>
                  <span className="text-gray-600">20 fev 2020</span>
                </div>
                <div className="created_by mt-3">
                  <h1 className="font-normal text-gray-400 tracking-wide">
                    Criador do departamento
                  </h1>
                  <span className="text-gray-600">Testando name</span>
                </div>
                <div className="diretor mt-2">
                  <h1 className="font-normal text-gray-500 tracking-wide">
                    Diretor do departamento
                  </h1>
                  <span className="text-gray-600">Gabriel Costa</span>
                </div>
                <div className="gerente mt-3">
                  <h1 className="font-normal text-gray-500 tracking-wide">
                    Gerente do departamento
                  </h1>
                  <span className="text-gray-600">Gabriel Costa</span>
                </div>
                <div className="coordenador mt-3">
                  <h1 className="font-normal text-gray-400 tracking-wide">
                    Coordenador do departamento
                  </h1>
                  <span className="text-gray-600">Gabriel Costa</span>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    )
  }

  function renderTabs() {
    return (
      <div
        style={{minHeight: '48px'}}
        className="mt-4 flex border-b border-gray-300"
      >
        <div className="flex flex-auto">
          <div
            className={`flex items-center	${
              tabs.details ? 'border-primary border-b-2' : ''
            }`}
          >
            <button
              style={{minWidth: '160px'}}
              onClick={() => tabHanlder('details')}
              type="button"
              className={`px-2 py-1 text-center relative tracking-wider	font-medium text-sm ${
                tabs.details ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Visão Geral
            </button>
          </div>
          <div
            className={`flex items-center ${
              tabs.logs ? 'border-primary border-b-2' : ''
            }`}
          >
            <button
              style={{minWidth: '160px'}}
              type="button"
              onClick={() => tabHanlder('logs')}
              className={`px-2 py-1 text-center relative tracking-wider	font-medium text-sm ${
                tabs.logs ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Logs
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{height: '100%', paddingTop: '20px'}}
      className="w-full h-full flex"
    >
      <div style={{minWidth: '240px', maxWidth: '320px', flex: '0 0 30%'}}>
        {renderDetails()}
      </div>
      <div style={{flexGrow: 1}} className="ml-14 select-none">
        {renderTabs()}
        {tabs.details ? (
          <Employees employees={departament.employees} />
        ) : tabs.logs ? (
          <LogsPage />
        ) : (
          <Employees employees={departament.employees} />
        )}
      </div>
    </div>
  )
})

export default DepartamentViewer
