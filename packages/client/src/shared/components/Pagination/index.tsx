import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {PaginationROOT, PaginationToolBar} from './styles'

const options = [
  {value: 10, label: '10'},
  {value: 15, label: '15'},
  {value: 25, label: '25'},
  {value: 5, label: '25'},
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
    <PaginationROOT>
      <PaginationToolBar isOPTOpen={isOPTOpen}>
        <p>Itens por pagina:</p>
        <div
          className="selection"
          role="presentation"
          onClick={() => setOPTOPEN(!isOPTOpen)}
        >
          <p>{limit.limit}</p>
          <div className="selection-options">
            <ul>
              {options.map((opt) => {
                return (
                  <li key={opt.value}>
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
        <div className="total-section">
          {page.page} de {total.total}
        </div>
        <div className="actions">
          <button
            style={{
              cursor: page.page === 1 ? 'default' : 'pointer',
              pointerEvents: page.page === 1 ? 'none' : 'auto',
            }}
            className="prev"
            type="button"
            onClick={() => previousPage()}
          >
            <span className="label">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </svg>
            </span>
          </button>
          <button
            style={{
              cursor: page.page === total.total ? 'default' : 'pointer',
              pointerEvents: page.page === total.total ? 'none' : 'auto',
            }}
            className="next"
            type="button"
            onClick={() => nextPage()}
          >
            <span className="label">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" />
              </svg>
            </span>
          </button>
        </div>
      </PaginationToolBar>
    </PaginationROOT>
  )
})

export default Pagination
