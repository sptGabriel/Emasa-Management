import React from 'react'
import styled from '@emotion/styled/macro'
import { Container } from './FlexBox'
import SideMenu from './SideMenu'

interface IsHover {
  isHover: boolean
}
const SideBarContainer = styled(Container)<IsHover>`
  width: 100%;
  position: relative;
  /* border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
  overflow-y: scroll;
  padding: 2px 1.5rem 1.5rem;
  ::-webkit-scrollbar {
    width: 10px;
    height: 18px;
  }
  ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 2px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 7px;
    background-color: rgba(242, 242, 242, 0.9);
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    margin-bottom: 40vh;
  } */
`

const SideBar: React.FC = () => {
  const [isHover] = React.useState(false)

  return (
    <SideBarContainer flexColumn isHover={isHover}>
      <SideMenu />
    </SideBarContainer>
  )
}

export default SideBar
