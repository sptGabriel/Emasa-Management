import React, { useState } from 'react'
import { css, keyframes } from '@emotion/react'
import useOnClickOutside from 'use-onclickoutside'
import styled from '@emotion/styled/macro'
import { BiChevronDown, BiMoon } from 'react-icons/bi'
import { FiBell, FiSun } from 'react-icons/fi'
import { AiOutlineCompress } from 'react-icons/ai'
import { observer } from 'mobx-react-lite'
import { Container } from './FlexBox'
import { useRootStore } from '../infra/mobx'
import userAvatar from '../../assets/user.png'
import VerticalSplit from './Divider'

const bellAnimation = keyframes`
  0% {
    transform: scaleX(1);
  }
  10% {
    transform: scale3d(.9,.9,.9) rotate(-3deg);
  }
  20% {
    transform: scale3d(.9,.9,.9) rotate(-3deg);
  }
  30% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  50% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  70% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  90% {
    transform: scale3d(1.1,1.1,1.1) rotate(3deg);
  }
  40% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  60% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  80% {
    transform: scale3d(1.1,1.1,1.1) rotate(-3deg);
  }
  100% {
    transform: scaleX(1);
  }
`
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
/* InterFaces Start */
interface IUserCanvas {
  isOpen: boolean
}
interface IUserProfile {
  open: boolean
}
/* User Profile Styles Section */
const UserProfile = styled('div')<IUserProfile>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  position: relative;
  :hover {
    span:first-of-type {
      filter: brightness(1.75);
    }
  }
  & .svg-arrow {
    color: #10387e !important;
    ${({ open }) =>
      open
        ? css`
            transform: rotate(180deg);
          `
        : ''}
  }
  & .user_text {
    cursor: pointer;
    display: flex !important;
    flex-direction: column;
    padding-left: 0.75rem !important;
    span:first-of-type {
      font-size: 0.8rem;
      color: #10387e !important;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
    }
    span:last-of-type {
      font-size: 0.8rem;
      color: #838598 !important;
      letter-spacing: 0.7px;
      font-family: Roboto;
      text-transform: capitalize;
      font-weight: 500;
      white-space: nowrap;
    }
  }
  & .user_avatar {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    transition: border-color 0.2s;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
const UserCanvas = styled.div<IUserCanvas>`
  position: absolute;
  width: 100%;
  display: ${(props: IUserCanvas) => (props.isOpen ? 'block' : 'none')};
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-color: rgba(120, 130, 140, 0.13);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  top: 100%;
  bottom: 0;
  font-size: 1rem;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  padding: 1rem;
  border-radius: 0.25rem;
  height: max-content;
  :before {
    content: '';
    position: absolute;
    top: -8px;
    right: calc(50% - 8px);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    z-index: 1;
    border-bottom: 8px solid rgba(0, 0, 0, 0.4);
  }
  :after {
    content: '';
    position: absolute;
    top: -8px;
    right: calc(50% - 8px);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid #fff;
    z-index: 1;
  }
  & .separator {
    height: 1px;
    margin: 9px 0;
    overflow: hidden;
    background-color: rgba(120, 130, 140, 0.13);
  }
  & .dflex {
    display: flex;
    align-items: center;
    padding: 10px 0;
    svg {
      color: #465464;
    }
    h3 {
      margin-left: 10px;
      font-size: 1rem;
      color: #838598 !important;
      font-weight: 500 !important;
    }
  }
`
const WrapperTools = styled(Container)<SideBarState>`
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  display: flex;
  margin-left: auto;
  position: relative;
  & .bell {
    animation: ${bellAnimation} 1.5s ease infinite;
  }
  & .tool_widget {
    cursor: pointer;
    list-style: none;
    color: #10387e;
    padding: 0.4rem;
    :hover {
      filter: brightness(1.75);
    }
  }
`
const LogoutWidget = styled('div')`
  padding: 0 1rem;
  margin: 0;
  button {
    display: flex;
    align-items: center;
  }
  svg {
    color: #3e82f7;
    :hover {
      color: #bde0fe;
      opacity: 0.6;
    }
  }
`
const UserSection: React.FC = () => {
  const [open, setOpen] = useState(false)
  const ref = React.useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  return (
    <UserProfile ref={ref} onClick={() => setOpen(!open)} open={open}>
      <div className="user_avatar">
        <img src={userAvatar} alt="Logo" />
      </div>
      <span className="svg-arrow">
        <BiChevronDown />
      </span>
      <div className="user_text">
        <span>SpiriT</span>
        <span>Web Developer</span>
      </div>
      <UserCanvas isOpen={open} />
    </UserProfile>
  )
}
const ToolsNav: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return (
    <WrapperTools justify="space-between" open={layoutStore.sideBar}>
      <li className="tool_widget">
        <BiMoon size={24} />
      </li>
      <li className="tool_widget bell">
        <FiBell size={24} />
      </li>
      <li className="tool_widget">
        <AiOutlineCompress size={24} />
      </li>
      <li className="tool_widget">
        <FiSun size={24} />
      </li>
      <VerticalSplit />
      <UserSection />
    </WrapperTools>
  )
})

export default ToolsNav
