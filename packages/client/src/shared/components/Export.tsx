import React, {useRef, useState} from 'react'
import useOnClickOutside from 'use-onclickoutside'
import Modal from './Modal'

const PeriodOption: React.FC<{state: any; setState: any}> = ({
  state,
  setState,
}: any) => {
  function handlerOptions(
    ev: any,
    custom?: {active: boolean; initalDate: Date; finalDate: Date},
  ) {
    switch (ev.target.value) {
      case 'lastMonth':
        return setState({
          today: false,
          currentMonth: false,
          lastWeek: false,
          all: false,
          lastMonth: true,
          customDate: {...state.customDate, active: false},
        })
      case 'today':
        return setState({
          today: true,
          currentMonth: false,
          lastWeek: false,
          all: false,
          lastMonth: false,
          customDate: {...state.customDate, active: false},
        })
      case 'currentMonth':
        return setState({
          today: false,
          currentMonth: true,
          lastWeek: false,
          lastMonth: false,
          all: false,
          customDate: {...state.customDate, active: false},
        })
      case 'lastWeek':
        return setState({
          today: false,
          currentMonth: false,
          lastMonth: false,
          lastWeek: true,
          all: false,
          customDate: {...state.customDate, active: false},
        })
      case 'all':
        return setState({
          today: false,
          currentMonth: false,
          lastMonth: false,
          lastWeek: false,
          all: true,
          customDate: {...state.customDate, active: false},
        })
      case 'customDate':
        return setState({
          today: false,
          currentMonth: false,
          lastWeek: false,
          lastMonth: false,
          all: false,
          customDate: custom || {...state.customDate, active: true},
        })
      default:
        return setState({
          today: true,
          currentMonth: false,
          lastMonth: false,
          lastWeek: false,
          all: false,
          customDate: {...state.customDate, active: false},
        })
    }
  }
  return (
    <div className="mt-2 flex flex-col">
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.today ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.today ? 'shadow-radioShadow' : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="today"
            name="today"
            value="today"
            checked={state.today}
            onClick={(e) => handlerOptions(e)}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Hoje</span>
      </div>
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.currentMonth ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.currentMonth
              ? 'shadow-radioShadow'
              : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="currentMonth"
            name="currentMonth"
            value="currentMonth"
            checked={state.currentMonth}
            onClick={(e) => handlerOptions(e)}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Mês Atual</span>
      </div>
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.lastWeek ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.lastWeek
              ? 'shadow-radioShadow'
              : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="lastWeek"
            name="lastWeek"
            value="lastWeek"
            checked={state.lastWeek}
            onClick={(e) => handlerOptions(e)}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Semana Anterior</span>
      </div>
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.lastMonth ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.lastMonth
              ? 'shadow-radioShadow'
              : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="lastMonth"
            name="lastMonth"
            value="lastMonth"
            checked={state.lastMonth}
            onClick={(e) => handlerOptions(e)}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Mês Anterior</span>
      </div>
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.all ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.all ? 'shadow-radioShadow' : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="all"
            name="all"
            value="all"
            checked={state.all}
            onClick={(e) => handlerOptions(e)}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Tudo</span>
      </div>
      <div className="inline-flex items-center mb-2">
        <div
          style={{
            minHeight: '14px',
            height: '14px',
            background: state.customDate.active ? 'rgb(84, 105, 212)' : '#fff',
            minWidth: '14px',
            marginTop: '-1.38px',
          }}
          className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
            state.customDate.active
              ? 'shadow-radioShadow'
              : 'shadow border border-gray-300'
          }`}
        >
          <input
            className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
            id="customDate"
            name="customDate"
            value="customDate"
            checked={state.customDate.active}
            onChange={(e) => handlerOptions(e)}
            type="radio"
          />
          <div
            style={{
              width: '6px',
              height: '6px',
            }}
            className="rounded-md bg-white opacity-1 absolute z-1 hover:scale-110"
          />
        </div>
        <span className="ml-2 font-medium text-sm">Personalizado</span>
      </div>
      {state.customDate.active ? (
        <div className="flex">
          <input
            type="date"
            className="mr-3 bg-white rounded-lg px-2 py-0.5 shadow-md border border-gray-300 cursor-pointer"
            value={state.customDate.initalDate.toISOString().slice(0, 10)}
            onChange={(e) => {
              if (new Date(e.target.value) > state.customDate.finalDate) return
              setState({
                ...state,
                customDate: {
                  ...state.customDate,
                  initalDate: new Date(e.target.value),
                },
              })
            }}
          />
          <input
            type="date"
            className="bg-white rounded-lg px-2 py-0.5 shadow-md border border-gray-300 cursor-pointer"
            min={state.customDate.initalDate.getDate()}
            value={state.customDate.finalDate.toISOString().slice(0, 10)}
            onChange={(e) =>
              setState({
                ...state,
                customDate: {
                  ...state.customDate,
                  finalDate: new Date(e.target.value),
                },
              })
            }
          />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

const ColumnsNames: React.FC<{state: any; setState: any}> = ({
  setState,
  state,
}) => {
  const [isOpen, setOpen] = useState(false)
  const ref: any = useRef()
  useOnClickOutside(ref, () => {
    setOpen(false)
  })

  function clickHandler(name: any) {
    if (!name) return
    setState(
      state.map((item: any) => ({
        ...item,
        active: item.name === name || false,
      })),
    )
    setOpen(false)
  }

  function renderOptions() {
    return (
      <div className="absolute mt-1 rounded-md bg-white shadow-lg">
        <ul
          style={{width: '200px'}}
          ref={ref}
          role="listbox"
          className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          {state.map((item: any, index: number) => (
            <li
              key={index}
              id="listbox-item-0"
              className="cursor-pointer pl-4 pr-10 text-gray-900 cursor-default select-none relative py-2"
            >
              <button
                className="w-full flex"
                type="button"
                onClick={() => clickHandler(item.name)}
              >
                <span className="block font-normal truncate">{item.name}</span>
              </button>
              {item.active ? (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function renderCustomOptions() {
    return (
      <div>
        <p>a</p>
      </div>
    )
  }

  return (
    <div className="mt-1">
      <button
        style={{width: '200px'}}
        onClick={() => setOpen(!isOpen)}
        type="button"
        className="relative bg-white border border-gray-300 rounded-md shadow-sm pl-4 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <span className="block truncate">
          {state.find((item: any) => item.active).name}
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>
      {isOpen ? renderOptions() : ''}
      {state.find((item: any) => item.name === 'Personalizado' && item.active)
        ? renderCustomOptions()
        : ''}
    </div>
  )
}

export const ExportModal: React.FC<{
  data: any[]
  setModal: any
  toggle: any
  active: boolean
  tittle: string
  btActionName: string
  columns: any
}> = ({data, active, setModal, toggle, tittle, btActionName, columns}) => {
  const [exportType, setType] = useState({
    today: true,
    currentMonth: false,
    lastWeek: false,
    all: false,
    lastMonth: false,
    customDate: {
      active: false,
      initalDate: new Date(new Date().getFullYear(), 0, 1),
      finalDate: new Date(),
    },
  })

  const [columnNames, setColumns] = useState([
    {active: true, columns, name: `Padrão (${columns.length})`},
    {active: false, columns: [], name: `Todas as Colunas (${columns.length})`},
    {active: false, columns, name: `Personalizado`},
  ])

  return (
    <Modal
      isShowing={active}
      hide={toggle}
      hideWithOutSide={setModal}
      tittle={tittle}
      btActionName={btActionName}
    >
      <form className="select-none">
        <div
          style={{background: '#f7fafc'}}
          className="flex-auto overflow-hidden overflow-y-auto px-5 py-5"
        >
          <div className="mb-6">
            <span className="font-medium text-sm">Selecione um período</span>
            <PeriodOption setState={setType} state={exportType} />
          </div>
          <div className="max-w-md">
            <span className="font-medium text-sm">Selecione as colunas</span>
            <ColumnsNames state={columnNames} setState={setColumns} />
          </div>
        </div>
        <footer
          style={{boxShadow: 'inset 0 1px #e3e8ee'}}
          className="flex-auto px-5 py-5 flex justify-end"
        >
          <button
            onClick={() => setModal(false)}
            type="button"
            className="mr-2 bg-white hover:shadow text-black font-medium  py-1 px-3 rounded-xl inline-flex items-center mr-2 shadow-sm border-gray-300 border"
          >
            Cancelar
          </button>
          <button
            className="bg-blue-800 hover:shadow text-white font-medium py-1 px-3 rounded-xl inline-flex items-center shadow-md"
            type="button"
          >
            {btActionName}
          </button>
        </footer>
      </form>
    </Modal>
  )
}
