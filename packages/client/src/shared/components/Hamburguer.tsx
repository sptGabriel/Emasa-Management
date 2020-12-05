/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'

const burguer = css`
  width: 25px;
  height: 15px;
  position: relative;
  display: inline-block;
  box-shadow: inset 0 2px 0 #3f6ad8;
  cursor: pointer;
  ::after,
  ::before {
    content: '';
    width: 100%;
    height: 2px;
    background-color: #3f6ad8;
    position: absolute;
  }
  ::after {
    bottom: 0px;
    left: 0;
  }
  ::before {
    top: 6px;
    left: 0;
  }
`

// const handleKeyDown = (ev) => {
//   console.log(ev)
//   if (ev.keyCode === 71) {
//     dispatch(toggleSide(!sideisOpen))
//   }
// }

const MenuBurguer: React.FC = () => {
  return <div css={burguer} />
}

export default MenuBurguer
