import React from 'react'
import {keyframes} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {BiMoon} from 'react-icons/bi'
import {FiBell, FiSun} from 'react-icons/fi'
import {AiOutlineCompress} from 'react-icons/ai'
import {Container} from './FlexBox'
import VerticalSplit from './Divider'
import Search from './SearchBox'
import {useRootStore} from '../infra/mobx'
import UserProfile from './UserProfile'

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
  open: boolean
}

const WrapperTools = styled(Container)<SideBarState>`
  display: flex;
  align-items: center;
  background: ${({theme}: any) => theme.background};
  & .bell {
    animation: ${bellAnimation} 1.5s ease infinite;
  }
  & .tool_widget {
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    transition: background 0.2s ease 0s;
    cursor: pointer;
    list-style: none;
    width: 46px;
    height: 46px;
    svg {
      color: ${({theme}: any) => `rgb(${theme.header.tools})`} !important;
    }
    :hover {
      background: ${({theme}: any) => `rgb(${theme.backgroundSecondary})`};
      svg {
        color: ${({theme}: any) =>
          `rgb(${theme.header.toolsHover})`} !important;
      }
    }
  }
`

export const VerticalWidgets: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <WrapperTools open={layoutStore.sideBar} justify="flex-end">
      <button
        className="tool_widget"
        onClick={layoutStore.setDarkTheme}
        type="button"
      >
        {layoutStore.theme.type === 'dark' ? (
          <BiMoon size={18} />
        ) : (
          <FiSun size={18} />
        )}
      </button>
      <button className="tool_widget bell" type="button">
        <FiBell size={18} />
      </button>
      <button className="tool_widget" type="button">
        <AiOutlineCompress size={18} />
      </button>
      <VerticalSplit />
    </WrapperTools>
  )
})

export const HorizontalWidgets: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <WrapperTools open={layoutStore.sideBar} justify="flex-end">
      <button
        className="tool_widget"
        onClick={layoutStore.setDarkTheme}
        type="button"
      >
        {layoutStore.theme.type === 'dark' ? (
          <BiMoon size={18} />
        ) : (
          <FiSun size={18} />
        )}
      </button>
      <button className="tool_widget bell" type="button">
        <FiBell size={18} />
      </button>
      <button className="tool_widget" type="button">
        <AiOutlineCompress size={18} />
      </button>
      {/* <VerticalSplit /> */}
    </WrapperTools>
  )
})
