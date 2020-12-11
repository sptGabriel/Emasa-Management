import React from 'react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { useRootStore } from '../infra/mobx'
import { Container } from './FlexBox'
import SideMenu from './SideMenu'

interface IsHover {
  isHover: boolean
  sideisOpen: boolean
}
const SideBarContainer = styled(Container)<IsHover>`
  width: 100%;
  position: relative;
  /* border-right: 1px solid rgba(0, 0, 0, 0.12); */
  box-shadow: 0 0 21px 0 rgba(89, 102, 122, 0.1);
  background: #fff;
  overflow-y: ${({ sideisOpen }) => (sideisOpen ? 'auto' : 'hidden')};
  ::-webkit-scrollbar {
    width: 6px;
    height: 18px;
  }
  ::-webkit-scrollbar-thumb:vertical {
    height: 6px;
    border: 1px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    -webkit-border-radius: 100vh;
    background: ${({ isHover }) => (isHover ? '#bde0fe' : '#fff')};
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
    background-clip: content-box;
    margin-top: 10px;
    margin-bottom: 10px;
    /* margin-bottom: 40vh; */
  }
`

const SideBar: React.FC = observer(() => {
  const [isHover, setHovered] = React.useState(false)
  const { layoutStore } = useRootStore()
  return (
    <SideBarContainer
      flexColumn
      isHover={isHover}
      sideisOpen={layoutStore.sideBar}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <SideMenu />
    </SideBarContainer>
  )
})

export default SideBar
