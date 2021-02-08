import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'
import styled from '@emotion/styled'
import {Container} from './FlexBox'

export const TableTools = styled(Container)<{selectedLength: boolean}>`
  position: relative;
  width: 100%;
  svg {
    fill: currentColor;
    width: 1em;
    height: 1em;
    display: inline-block;
    font-size: 1.5rem;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    flex-shrink: 0;
    user-select: none;
  }
  button {
    cursor: pointer;
    margin: 0;
    display: inline-flex;
    flex: 0 0 auto;
    color: rgba(0, 0, 0, 0.54);
    padding: 12px;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`

export function TableToolsHeader({
  justify,
  align,
  sectionName,
  totalSelected,
}: {
  totalSelected: number
  justify: string
  align: string
  sectionName: string
}) {
  function renderTitle() {
    return (
      <h3
        style={{
          fontSize: '1.25rem',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          lineHeight: 1.6,
          letterSpacing: '0.0075em',
        }}
      >
        {sectionName}
      </h3>
    )
  }
  function renderTools() {
    return (
      <div className="tools">
        <button type="button">
          <svg
            className="bt-search"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
        <button type="button">
          <svg
            className="bt-csv"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
          </svg>
        </button>
        <button type="button">
          <svg
            className="bt-print"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
          </svg>
        </button>
        <button type="button">
          <svg
            className="bt-column"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z" />
          </svg>
        </button>
        <button type="button">
          <svg
            className="bt-filter"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
          </svg>
        </button>
      </div>
    )
  }
  function renderOnSelected() {
    return (
      <>
        <span>{totalSelected} linha(s) selecionada(s)</span>
        <button type="button">
          <FaTrashAlt />
        </button>
      </>
    )
  }
  return (
    <TableTools
      justify={justify}
      align={align}
      selectedLength={totalSelected > 0 || false}
    >
      {totalSelected === 0 ? (
        <>
          {renderTitle()}
          {renderTools()}
        </>
      ) : (
        renderOnSelected()
      )}
    </TableTools>
  )
}
