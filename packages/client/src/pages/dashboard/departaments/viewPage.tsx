import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {TiArrowSortedDown} from 'react-icons/ti'
import {useRootStore} from '../../../shared/infra/mobx'
import {DepartamentModel} from '../../../models/departamentModel'
import userAvatar from '../../../assets/logo_emasa.png'
import {UserModel} from '../../../models/userModel'
import {createBackgroundImage} from '../../../shared/utils/createCloudinaryBG'
import {capitalizeFirstLetter} from '../../../shared/utils/capitalizeFirstLetter'
import {DepartamentRequestLogs} from '../../../models/departamentRequestLogs'

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
    return employees.map((item: any) => (
      <tr
        key={item.id}
        className="flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
      >
        <td
          style={{width: '15%'}}
          className="w-full lg:w-auto py-3 pl-4 pr-3 border border-b text-left block lg:table-cell relative lg:static"
        >
          <div className="flex items-center">
            <div
              style={{width: '40px', height: '40px', borderRadius: '50%'}}
              className="overflow-hidden relative flex items-center"
            >
              <img
                src={
                  item.avatar ? createBackgroundImage(item.avatar) : userAvatar
                }
                className="absolute top-0 left-0 w-full h-full"
                alt="Logo"
              />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="font-light text-xs text-gray-500">
                {item.email || ''}
              </span>
            </div>
          </div>
        </td>
        <td
          className="w-full lg:w-auto py-3 pl-4 pr-3 border border-b text-left block lg:table-cell relative lg:static"
          style={{width: '25%'}}
        >
          {item.matricula}
        </td>
        <td
          className="w-full lg:w-auto py-3 pl-4 pr-3 border border-b text-left block lg:table-cell relative lg:static"
          style={{width: '25%'}}
        >
          {item.position}
        </td>
        <td
          className="w-full lg:w-auto py-3 pl-4 pr-3 border border-b text-left block lg:table-cell relative lg:static"
          style={{width: '10%'}}
        >
          <span
            className={`rounded py-1 px-3 text-xs ${
              item.situation
                ? 'bg-green-400 text-white'
                : 'bg-red-400 text-white'
            }`}
          >
            {item.situation ? 'Ativo' : 'Inativo'}
          </span>
        </td>
      </tr>
    ))
  }

  return (
    <div>
      <div
        style={{boxShadow: 'inset 0 -1px #e3e8ee'}}
        className="employees w-full mt-7 py-4"
      >
        <span className="font-semibold text-xl tracking-wider	">
          Funcionários
        </span>
      </div>
      {employees.length > 0 ? (
        <table className="border-collapse w-full mt-8">
          <thead>
            <tr>
              {['Nome', 'Matricula', 'Cargo', 'Situação'].map((item, index) => (
                <th
                  key={index}
                  className="text-sm py-3 pl-4 pr-3 font-semibold bg-gray-200 text-gray-700 border border-gray-300 hidden lg:table-cell text-left"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{renderDataList()}</tbody>
        </table>
      ) : (
        ''
      )}
    </div>
  )
}

const LogsPage: React.FC<{requestLogs: DepartamentRequestLogs[]}> = ({
  requestLogs,
}) => {
  return (
    <div>
      <div
        style={{boxShadow: 'inset 0 -1px #e3e8ee'}}
        className="employees w-full mt-7 py-4"
      >
        <span className="font-semibold text-xl tracking-wider	">Logs</span>
      </div>
      <div className="pt-1">
        {requestLogs.map((log) => (
          <div className="flex px-2 py-2 justify-between text-sm" key={log.id}>
            <div className="rounded-md bg-gray-200 px-2">
              <span className="mr-1">{log.code}</span>
              <span>{log.code === 200 ? 'OK' : 'BAD'}</span>
            </div>
            <div className="px-2">
              <span className="mr-4">{log.method}</span>
              <span>{log.url}</span>
            </div>
            <span>{log.createdAt.toLocaleString('pt-br')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const DepartamentViewer = observer(() => {
  const [tabs, setTab] = useState({
    details: true,
    logs: false,
  })
  const {departamentStore} = useRootStore()
  const {departamentId} = useParams()
  const [departament, setDepartament] = useState<any>(undefined)
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
    departamentStore
      .byID(departamentId)
      .then((res) => setDepartament(new DepartamentModel(res.data)))
  }, [])

  function renderDetails() {
    return (
      <div className="fixed self-start h-full flex pb-14">
        {departament ? (
          <div>
            <div className="info">
              <h1 className="font-roboto font-semibold text-2xl pt-3 pb-2">
                {departament.nome
                  ? capitalizeFirstLetter(departament.nome)
                  : ''}
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
                    <span className="text-gray-600">
                      {departament.createdAt
                        ? departament.createdAt.toLocaleString('pt-br')
                        : ''}
                    </span>
                  </div>
                  <div className="created_by mt-3">
                    <h1 className="font-normal text-gray-400 tracking-wide">
                      Criador do departamento
                    </h1>
                    <span className="text-gray-600">ANY</span>
                  </div>
                  <div className="diretor mt-2">
                    <h1 className="font-normal text-gray-400 tracking-wide">
                      Diretor do departamento
                    </h1>
                    <span className="text-gray-600">
                      {departament.diretor ? departament.diretor.nome : ''}
                    </span>
                  </div>
                  <div className="gerente mt-3">
                    <h1 className="font-normal text-gray-400 tracking-wide">
                      Gerente do departamento
                    </h1>
                    <span className="text-gray-600">
                      {departament.gerente ? departament.gerente.nome : ''}
                    </span>
                  </div>
                  <div className="coordenador mt-3">
                    <h1 className="font-normal text-gray-400 tracking-wide">
                      Coordenador do departamento
                    </h1>
                    <span className="text-gray-600">
                      {departament.coordenador
                        ? departament.coordenador.nome
                        : ''}
                    </span>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        ) : (
          ''
        )}
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
    <div className="w-full flex pb-11 relative h-full">
      <div style={{minWidth: '240px', maxWidth: '320px', flex: '0 0 30%'}}>
        {renderDetails()}
      </div>
      <div style={{flexGrow: 1}} className="ml-14 select-none">
        {renderTabs()}
        {departament && tabs.details ? (
          <Employees employees={departament.employees} />
        ) : departament && tabs.logs ? (
          <LogsPage requestLogs={departament.requestLogs} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
})

export default DepartamentViewer
