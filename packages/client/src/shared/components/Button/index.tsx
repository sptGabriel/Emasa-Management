import React from 'react'
import styled from '@emotion/styled'

const ButtonWrap = styled('button')`
  float: left;
  min-width: 150px;
  max-width: 250px;
  display: block;
  padding: 0.8em 2.4em;
  border: none;
  background: none;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: color 0.3s;
  font-size: 1em;
  color: ${({theme}: any) => `rgb(${theme.primary})`};
  background: transparent;
  border: 1px solid ${({theme}: any) => `rgb(${theme.primary})`};
  border-radius: 5px;
`
const Button: React.FC<{click: any}> = ({children, click}) => {
  return (
    <ButtonWrap onClick={click} type="button">
      {children}
    </ButtonWrap>
  )
}

export default Button
