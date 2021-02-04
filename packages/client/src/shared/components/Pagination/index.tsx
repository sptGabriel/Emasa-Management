import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import {PaginationROOT, PaginationToolBar} from './styles'

const options = [
  {value: 10, label: '10'},
  {value: 15, label: '15'},
  {value: 25, label: '25'},
]

const Pagination: React.FC<{
  perPage: number
  page: number
  total: number
  isLoading: boolean
}> = observer(({page, perPage, total, isLoading}) => {
  const [pagination, setPagination] = useState({
    perPage,
    page,
    total,
    isOPTOpen: false,
  })
  return (
    <PaginationROOT>
      <PaginationToolBar isOPTOpen={pagination.isOPTOpen}>
        <p>Itens por pagina:</p>
        <div
          className="selection"
          role="presentation"
          onClick={() =>
            setPagination({
              ...pagination,
              isOPTOpen: !pagination.isOPTOpen,
            })
          }
        >
          <p>{pagination.perPage}</p>
          <div className="selection-options">
            <ul>
              {options.map((opt) => (
                <li>{opt.value}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="total-section">
          {page} de {total}
        </div>
        <div className="actions">
          <button className="prev" type="button">
            <span className="label">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" />
              </svg>
            </span>
          </button>
          <button className="next" type="button">
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
