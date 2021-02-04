import styled from '@emotion/styled'

export const DepartamentMain = styled('div')`
  min-height: calc(100% - 60px) !important;
  height: auto;
  width: 100%;
  padding: 0;
`
export const TableContent = styled('div')``
export const ResponsiveTable = styled('table')`
  width: 100%;
  margin: 0;
  padding: 0;
  border-collapse: collapse;
  border-spacing: 0;
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
  .paddingCheckbox {
    width: 48px;
    padding: 0 0 0 4px;
    display: table-cell;
    font-size: 0.875rem;
    text-align: left;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    letter-spacing: 0.01071em;
    vertical-align: inherit;
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
    tr {
      background: #fff;
      display: table-row;
      border-bottom-width: 1px;
      margin-bottom: 0;
      border: 1px solid #ddd;
      border-bottom: 2px solid #ddd;
      padding: 5px;
    }
    td {
      display: table-cell;
      text-align: left;
      font-size: 14px;
      border-bottom: none;
    }
  }
  tr {
    border: 1px solid #ddd;
    border-bottom: 2px solid #ddd;
    padding: 5px;
    margin-bottom: 10px;
    display: table-row;
    border-bottom-width: 1px;
    margin-bottom: 0;
  }
  th,
  td {
    padding: 10px;
    text-align: left;
  }
  th {
    text-transform: uppercase;
    font-size: 11px;
  }
  td {
    display: block;
    text-align: right;
    font-size: 13px;
    border-bottom: 1px dotted #ddd;
    &:last-of-type {
      border-bottom: none;
    }
    /* :before {
      content: attr(data-label);
      float: left;
      text-transform: uppercase;
      font-weight: bold;
    } */
  }
`
