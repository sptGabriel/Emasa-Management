import {observer} from 'mobx-react-lite'
import React, {useState} from 'react'

const options = [
  {value: 10, label: '10'},
  {value: 15, label: '15'},
  {value: 25, label: '25'},
]

const Pagination: React.FC<{
  limit: {limit: number; setLimit: any}
  page: {page: number; setPage: any}
  total: {total: number; setTotal: any}
  isLoading: {loading: boolean; setLoad: any}
}> = observer(({limit, page, total, isLoading}) => {
  const nextPage = () => {
    if (page.page === total.total) return
    page.setPage(page.page + 1)
  }
  const previousPage = () => {
    if (page.page === 1) return
    page.setPage(page.page - 1)
  }
  const [isOPTOpen, setOPTOPEN] = useState(false)
  return (
    <div className="pt-4 pb-4 pr-6 pl-6 w-full flex bg-white justify-between items-center">
      <div className="font-medium text-gray-600 relative flex">
        <span className="mr-1 font-bold text-gray-600">
          Registros por pagina:
        </span>
        <div
          className="cursor-pointer items-center justify-center px-2 justify-center mr-2"
          role="presentation"
          onClick={() => setOPTOPEN(!isOPTOpen)}
        >
          {limit.limit}
          <div
            style={{
              display: isOPTOpen ? 'block' : 'none',
              transform: 'translateX(-0.5rem) rotate(360deg)',
            }}
            className="absolute bottom-0 bg-white rounded pb-0 pt-2 px-2 shadow-md"
          >
            <ul className="pr-0 w-full m-0 relative list-none">
              {options.map((opt) => {
                return (
                  <li
                    className="w-full flex text-left items-center cursor-pointer font-medium"
                    key={opt.value}
                  >
                    <button
                      type="button"
                      onClick={() => limit.setLimit(opt.value)}
                    >
                      {opt.value}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <span>
          {page.page} de {total.total}
        </span>
        <span className="ml-2"> Página(s)</span>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          disabled={page.page === 1}
          onClick={() => previousPage()}
          className={`${
            page.page === 1
              ? 'cursor-default text-gray-500 bg-indigo-200 shadow-sm'
              : 'border-blue-500 text-blue-800 hover:bg-blue-800 hover:text-white'
          } border block rounded-md font-medium text-md py-2 px-5 mr-2 flex items-center`}
        >
          Previous page
        </button>
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={page.page === total.total}
          className={`${
            page.page === total.total
              ? 'cursor-default text-gray-500 bg-indigo-200 shadow-sm'
              : 'border-blue-500 text-blue-800 hover:bg-blue-800 hover:text-white'
          } border block rounded-md font-medium text-md py-2 px-5 ml-2 flex items-center`}
        >
          Next page
        </button>
      </div>
    </div>
  )
})

export default Pagination
