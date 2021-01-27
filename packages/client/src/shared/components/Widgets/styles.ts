import {keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {Container} from '../FlexBox'

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
interface SideBarState {
  open: boolean
}

export const WrapperTools = styled(Container)<SideBarState>`
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
      color: ${({theme}: any) => `rgb(${theme.header.tools})`};
    }
    :hover {
      /* background: ${({theme}: any) =>
        `rgb(${theme.backgroundSecondary})`}; */
      svg {
        color: ${({theme}: any) => `rgb(${theme.header.toolsHover})`};
      }
    }
  }
`
