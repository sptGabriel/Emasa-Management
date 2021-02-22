import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../../shared/infra/mobx'

const DetailsPage = () => {
  return <p>details</p>
}

const Employees = () => {
  return <p>employees</p>
}

const LogsPage = () => {
  return <p>logs</p>
}

const DepartamentViewer = observer(() => {
  const [tabs, setTab] = useState({
    details: true,
    employees: false,
    logs: false,
  })
  const {departamentStore} = useRootStore()
  const {departamentId} = useParams()

  function tabHanlder(value: string) {
    switch (value) {
      case 'details':
        return setTab({details: true, employees: false, logs: false})
      case 'logs':
        return setTab({details: false, employees: false, logs: true})
      case 'employees':
        return setTab({details: false, employees: true, logs: false})
      default:
        return setTab({details: true, employees: false, logs: false})
    }
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
              Detalhes
            </button>
          </div>
          <div
            className={`flex items-center ${
              tabs.employees ? 'border-primary border-b-2' : ''
            }`}
          >
            <button
              style={{minWidth: '160px'}}
              type="button"
              onClick={() => tabHanlder('employees')}
              className={`px-2 py-1 text-center relative tracking-wider	font-medium text-sm ${
                tabs.employees ? 'text-primary' : 'text-gray-400'
              }`}
            >
              Funcionarios
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

  useEffect(() => {
    departamentStore.byID(departamentId).then((res) => console.log(res))
  }, [departamentId])

  return (
    <div>
      {renderTabs()}
      <div className="mt-4">
        {tabs.details ? (
          <DetailsPage />
        ) : tabs.employees ? (
          <Employees />
        ) : tabs.logs ? (
          <LogsPage />
        ) : (
          <DetailsPage />
        )}
      </div>
    </div>
  )
})
