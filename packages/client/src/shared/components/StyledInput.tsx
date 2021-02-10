import styled from '@emotion/styled'

export const StyledInput = styled('div')`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  label {
    display: block;
    width: 100%;
    min-height: 16px;
    font-size: 14px;
    color: rgb(135, 134, 139);
    margin-bottom: 8px;
  }
  div:first-of-type {
    position: relative;
    flex: 1 1 0%;
  }
  input {
    width: 100%;
    height: 50px;
    font-size: 16px;
    background: 0 0;
    border: 1px solid rgba(219, 219, 219, 1);
    color: rgb(135, 134, 139);
    padding: 0px 1em;
    border-radius: 5px;
    font-family: Roboto, sans-serif;
  }
`
