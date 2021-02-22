import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {TiArrowSortedDown} from 'react-icons/ti'
import {useRootStore} from '../../../shared/infra/mobx'
import {DepartamentModel} from '../../../models/departamentModel'

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
  const [departament, setDepartament] = useState({} as DepartamentModel)
  const [expandDetails, setExpandOn] = useState(false)
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

  useEffect(() => {
    departamentStore.byID(departamentId).then((res) => setDepartament(res))
  }, [departamentId])

  function renderDetails() {
    return (
      <div
        style={{bottom: '-10px'}}
        className="sticky self-start h-full flex pb-14"
      >
        <div>
          <div className="info">
            <h1 className="font-roboto font-semibold text-2xl pt-3 pb-2">
              Tecnologia da informação
            </h1>
            {/* <div className="grid grid-cols-2 grid-rows-2 grid-rows-2 items-center pt-5">
              <p className="col-start-1	row-start-1 font-normal text-gray-500">
                Total funcionários &nbsp;
              </p>
              <span className="text-gray-600 font-medium	col-start-1 row-start-2">
                20
              </span>
              <p className="col-start-2 row-start-1 font-normal text-gray-500">
                Atualizado em &nbsp;
              </p>
              <span className="text-gray-600 font-medium col-start-2 row-start-2">
                fev. de 2021
              </span>
            </div> */}
          </div>
          <div className="pb-2 details relative">
            <div
              style={{boxShadow: expandDetails ? 'inset 0 -1px #e3e8ee' : ''}}
              className="py-5"
            >
              <button
                type="button"
                onClick={() => setExpandOn(!expandDetails)}
                className="font-semibold tracking-wider text-xl flex items-center"
              >
                <span className="mr-2 text-gray-500">
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
                  <h1>Criado em:</h1>
                  <span>20 fev 2020</span>
                </div>
                <div className="created_by">
                  <h1>Criado por:</h1>
                  <span>Testando name</span>
                </div>
                <div className="diretor">
                  <h1>Diretor do departamento</h1>
                  <span>Gabriel Costa</span>
                </div>
                <div className="gerente">
                  <h1>Gerente do departamento</h1>
                  <span>Gabriel Costa</span>
                </div>
                <div className="coordenador">
                  <h1>Coordenador do departamento</h1>
                  <span>Gabriel Costa</span>
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

  return (
    <div
      style={{height: '100%', paddingTop: '20px'}}
      className="w-full h-full flex"
    >
      <div style={{minWidth: '240px', maxWidth: '320px', flex: '0 0 30%'}}>
        {renderDetails()}
      </div>
      <div style={{flexGrow: 1}} className="ml-14">
        <div>2</div>
      </div>
    </div>
  )
})

export default DepartamentViewer
