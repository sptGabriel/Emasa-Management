import React, {useState} from 'react'
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

const ColumnsNames: React.FC<{state: any; setState: any}> = () => {
  return <div>a</div>
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

  const [columnNames, setColumns] = useState({})

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
          <div>
            <span className="font-medium text-sm">Selecione as colunas</span>
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
