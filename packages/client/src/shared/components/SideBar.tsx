import React from 'react'
import styled from '@emotion/styled/macro'
import { GoHome } from 'react-icons/go'
import { Container, FlexDynamicCSS } from './FlexBox'

interface IsHover {
  isHover: boolean
}
/* SideBar Styles Start */
const SideBarContainer = styled(Container)<IsHover>`
  flex: 0 0 250px;
  max-width: 250px;
  min-width: 250px;
  width: 250px;
  height: calc(100vh - 70px);
  position: fixed;
  top: 70px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background-color: #fff;
  /* z-index: 1000;
  background: linear-gradient(
    180deg,
    rgba(137, 80, 240, 1) 0%,
    rgba(86, 0, 255, 1) 100%
  ); */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 25px 25px transparent;
    border: solid 3px transparent;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`

const SideBar: React.FC = () => {
  const [isHover] = React.useState(false)

  return (
    <SideBarContainer flexColumn isHover={isHover}>
      a
    </SideBarContainer>
  )
}

export default SideBar
