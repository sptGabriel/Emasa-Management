/* eslint-disable prettier/prettier */
import React from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'

// const burguer = css`
//   width: 25px;
//   height: 15px;
//   position: relative;
//   display: inline-block;
//   box-shadow: inset 0 2px 0 #3f6ad8;
//   cursor: pointer;
//   ::after,
//   ::before {
//     content: '';
//     width: 100%;
//     height: 2px;
//     background-color: #3f6ad8;
//     position: absolute;
//   }
//   ::after {
//     bottom: 0px;
//     left: 0;
//   }
//   ::before {
//     top: 6px;
//     left: 0;
//   }
// `

// const handleKeyDown = (ev) => {
//   console.log(ev)
//   if (ev.keyCode === 71) {
//     dispatch(toggleSide(!sideisOpen))
//   }
// }
export interface SideBarState {
  open: boolean
}
const Burguer = styled('button')<SideBarState>`
  padding: 0px 0px;
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  transition: background 0.2s ease 0s;
  cursor: pointer;
  list-style: none;
  color: ${({theme}: any) =>
    theme.type === 'dark' ? 'rgb(168, 168, 179)' : '#10387e'};
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  border: 0;
  margin: 0;
  margin-top: 5px;
  transform: ${({open}) =>
    open ? 'translateX(calc(100% + 0.75rem))' : 'translateX(0)'};
  overflow: visible;
  :hover {
    filter: brightness(1.75);
  }
  .hamburger-box {
    width: 24px;
    height: 14px;
    display: inline-block;
    position: relative;
  }
  .hamburger-inner {
    transform: ${({open}) =>
      open ? 'translate3d(0, 6px, 0) rotate(135deg)' : ''};
    transition-delay: ${({open}) => (open ? '0.075s' : '')};
    width: 24px;
    height: 2px;
    background: ${({theme}: any) => theme.navBar.widget};
    border-radius: 10px;
    position: absolute;
    top: 1px;
    transition-duration: 0.275s;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    display: block;
    margin-top: -1px;
    ::before {
      transition-delay: ${({open}) => (open ? '0' : '0.0s')};
      opacity: ${({open}) => (open ? '0' : '1')};
      top: 6px;
      transition: opacity 0.125s 0.175s ease;
      content: '';
      display: block;
      width: 24px;
      height: 2px;
      background: ${({theme}: any) => theme.navBar.widget};
      border-radius: 10px;
      position: absolute;
    }
    ::after {
      transition-delay: ${({open}) => (open ? '0.075s' : '')};
      transform: ${({open}) =>
        open ? 'translate3d(0, -12px, 0) rotate(-270deg)' : ''};
      width: 24px;
      height: 2px;
      background: ${({theme}: any) => theme.navBar.widget};
      border-radius: 10px;
      position: absolute;
      content: '';
      display: block;
      bottom: -6px;
      top: 12px;
      transition: transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }
`

const MenuBurguer: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <Burguer
      open={layoutStore.sideBar}
      onClick={() => layoutStore.toggleSideBar()}
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </Burguer>
  )
})

export default MenuBurguer
