import {css} from '@emotion/react'
import styled from '@emotion/styled'
import {Container} from '../../../shared/components/FlexBox'
import {NoSelect} from '../../../shared/components/NoSelect'

export const DepartamentMain = styled('div')`
  min-height: calc(100% - 60px) !important;
  width: 100%;
  padding: 0 20px;
  ${NoSelect}
`
export const TableContent = styled('div')`
  box-shadow: 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%);
  border-radius: 4px;
  min-height: 100%;
`
export const ResponsiveTable = styled('table')`
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
  height: 100%;
  .paddingCheckbox {
    width: 48px;
    padding: 0 0 0 4px !important;
    color: #263238;
    font-weight: 500;
    line-height: 1.5rem;
    font-size: 0.875rem;
    text-align: left;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  }
  .tr-head {
    th {
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      letter-spacing: 0.01071em;
      vertical-align: inherit;
      display: table-cell;
      padding: 5px 8px 5px 4px !important;
      font-size: 0.875rem;
      text-align: left;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      color: #263238;
      font-weight: 500;
      line-height: 1.5rem;
    }
  }
  .root {
    padding: 9px;
    flex: 0 0 auto;
    overflow: visible;
    font-size: 1.5rem;
    text-align: center;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 50%;
    display: inline-flex;
    border: 0;
    cursor: pointer;
    margin: 0;
    position: relative;
    align-items: center;
    user-select: none;
    justify-content: center;
    vertical-align: middle;
    background-color: transparent;
  }
  thead {
    visibility: visible;
    background: #fff;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    border-collapse: collapse;
    border-spacing: 0;
    visibility: visible;
    background: #fff;
    min-height: calc(100% - 60px);
    td {
      display: table-cell;
      padding: 5px 8px 5px 0px;
      word-break: break-all;
      font-size: 0.875rem;
      text-align: left;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 400;
      line-height: 1.43;
      border-bottom: 1px solid rgba(224, 224, 224, 1);
      letter-spacing: 0.01071em;
      vertical-align: inherit;
    }
  }
`
export const TR = styled('tr')<{hasHover: number; selected?: boolean}>`
  color: inherit;
  display: table-row;
  outline: 0;
  vertical-align: middle;
  border-spacing: 0;
  border-collapse: collapse;
  background: ${({selected}) => (selected ? 'rgba(0, 0, 0, 0.08)' : '#fff')};
  ${({hasHover}) =>
    hasHover === 1
      ? css`
          :hover {
            background: #eee;
          }
        `
      : ''};
`
export const EditDepartament = styled(Container)`
  .modal-header {
  }
`
