import styled from '@emotion/styled'

export const PaginationROOT = styled('div')`
  color: #263238;
  font-size: 0.875rem;
  padding: 0;
  background: white;
`
export const PaginationToolBar = styled('div')<{isOPTOpen: boolean}>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  min-height: 52px;
  padding-right: 2px;
  padding-left: 24px;
  .selection {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    height: auto;
    overflow: hidden;
    min-height: 1.1876em;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align-last: right;
    user-select: none;
    cursor: pointer;
  }
  .selection-options {
    display: ${({isOPTOpen}) => (isOPTOpen ? 'block' : 'none')};
    position: absolute;
    transform: rotate(360deg);
    bottom: 0;
    background: white;
    border-radius: 4px;
    padding-top: 8px;
    padding-bottom: 8px;
    box-shadow: 0 0 1px 0 rgb(0 0 0 / 31%), 0 5px 8px -2px rgb(0 0 0 / 25%);
    ul {
      padding-right: 0px;
      width: calc(100% + 0px);
      margin: 0;
      padding: 0;
      position: relative;
      list-style: none;
      li {
        min-height: auto;
        width: 100%;
        display: flex;
        position: relative;
        text-align: left;
        align-items: center;
        cursor: pointer;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        font-weight: 400;
        line-height: 1.5;
        padding-top: 6px;
        padding-left: 12px;
        padding-right: 12px;
        white-space: nowrap;
        letter-spacing: 0.00938em;
        padding-bottom: 6px;
        justify-content: flex-start;
        text-decoration: none;
      }
    }
  }
  .total-section {
  }
  .actions {
    flex-shrink: 0;
    margin-left: 20px;
    .label {
      width: 100%;
      display: flex;
      align-items: inherit;
      justify-content: inherit;
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
    }
    button:first-of-type {
      color: rgba(0, 0, 0, 0.26);
      cursor: pointer;
      background-color: transparent;
      pointer-events: none;
      flex: 0 0 auto;
      padding: 12px;
      overflow: visible;
      font-size: 1.5rem;
      text-align: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50%;
      margin: 0;
      display: inline-flex;
      outline: 0;
      border: 0;
      position: relative;
      align-items: center;
      user-select: none;
      justify-content: center;
      text-decoration: none;
    }
    button:last-of-type {
      color: rgba(0, 0, 0, 0.26);
      background-color: transparent;
      cursor: default;
      pointer-events: none;
      flex: 0 0 auto;
      padding: 12px;
      overflow: visible;
      font-size: 1.5rem;
      text-align: center;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      border-radius: 50%;
      border: 0;
      margin: 0;
      display: inline-flex;
      outline: 0;
      position: relative;
      align-items: center;
      user-select: none;
      justify-content: center;
      text-decoration: none;
    }
  }
`
