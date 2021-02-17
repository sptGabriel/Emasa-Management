import React, {useState} from 'react'
import {Transform} from 'stream'
import Modal from './Modal'

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
  function handlerOptions(
    ev: any,
    custom?: {active: boolean; initalDate: Date; finalDate: Date},
  ) {
    switch (ev.target.value) {
      case 'lastMonth':
        return setType({
          today: false,
          currentMonth: false,
          lastWeek: false,
          all: false,
          lastMonth: true,
          customDate: {...exportType.customDate, active: false},
        })
      case 'today':
        return setType({
          today: true,
          currentMonth: false,
          lastWeek: false,
          all: false,
          lastMonth: false,
          customDate: {...exportType.customDate, active: false},
        })
      case 'currentMonth':
        return setType({
          today: false,
          currentMonth: true,
          lastWeek: false,
          lastMonth: false,
          all: false,
          customDate: {...exportType.customDate, active: false},
        })
      case 'lastWeek':
        return setType({
          today: false,
          currentMonth: false,
          lastMonth: false,
          lastWeek: true,
          all: false,
          customDate: {...exportType.customDate, active: false},
        })
      case 'all':
        return setType({
          today: false,
          currentMonth: false,
          lastMonth: false,
          lastWeek: false,
          all: true,
          customDate: {...exportType.customDate, active: false},
        })
      case 'customDate':
        return setType({
          today: false,
          currentMonth: false,
          lastWeek: false,
          lastMonth: false,
          all: false,
          customDate: custom || {...exportType.customDate, active: true},
        })
      default:
        return setType({
          today: true,
          currentMonth: false,
          lastMonth: false,
          lastWeek: false,
          all: false,
          customDate: {...exportType.customDate, active: false},
        })
    }
  }

  return (
    <Modal
      isShowing={active}
      hide={toggle}
      hideWithOutSide={setModal}
      tittle={tittle}
      btActionName={btActionName}
    >
      <form>
        <div
          style={{background: '#f7fafc'}}
          className="flex-auto overflow-hidden overflow-y-auto px-5 py-5"
        >
          <div>
            <span className="font-medium text-sm">Selecione um período</span>
            <div className="mt-2 flex flex-col">
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.today ? 'rgb(84, 105, 212)' : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.today
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="today"
                    name="today"
                    value="today"
                    checked={exportType.today}
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
              </label>
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.currentMonth
                      ? 'rgb(84, 105, 212)'
                      : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.currentMonth
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="currentMonth"
                    name="currentMonth"
                    value="currentMonth"
                    checked={exportType.currentMonth}
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
              </label>
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.lastWeek
                      ? 'rgb(84, 105, 212)'
                      : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.lastWeek
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="lastWeek"
                    name="lastWeek"
                    value="lastWeek"
                    checked={exportType.lastWeek}
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
                <span className="ml-2 font-medium text-sm">
                  Semana Anterior
                </span>
              </label>
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.lastMonth
                      ? 'rgb(84, 105, 212)'
                      : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.lastMonth
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="lastMonth"
                    name="lastMonth"
                    value="lastMonth"
                    checked={exportType.lastMonth}
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
              </label>
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.all ? 'rgb(84, 105, 212)' : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.all
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="all"
                    name="all"
                    value="all"
                    checked={exportType.all}
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
              </label>
              <label className="inline-flex items-center cursor-pointer mb-2">
                <div
                  style={{
                    minHeight: '14px',
                    height: '14px',
                    background: exportType.customDate.active
                      ? 'rgb(84, 105, 212)'
                      : '#fff',
                    minWidth: '14px',
                    marginTop: '-1.38px',
                  }}
                  className={`cursor-pointer flex items-center justify-center z-2 relative mx-full rounded-lg cursor-pointer  relative ${
                    exportType.customDate.active
                      ? 'shadow-radioShadow'
                      : 'shadow border border-gray-300'
                  }`}
                >
                  <input
                    className="cursor-pointer top-0 left-0 w-auto h-auto m-0 opacity-0 p-0 absolute z-10"
                    id="customDate"
                    name="customDate"
                    value="customDate"
                    checked={exportType.customDate.active}
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
              </label>
            </div>
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
