import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import SideMenu from './SideMenu'

interface IsHover {
  isHover: boolean
  sideisOpen: boolean
}
const SideBarContainer = styled(Container)<IsHover>`
  width: 100%;
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  /* box-shadow: ${({theme}: any) =>
    theme.type === 'dark'
      ? '0 0 4px 0 rgba(89, 102, 122, 0.1)'
      : '0 0 15px 0 rgba(0,0,0,.05)'}; */
  background: ${({theme}: any) => theme.background || '#fff'};
  overflow-y: ${({sideisOpen}) => (sideisOpen ? 'auto' : 'hidden')};
  overscroll-behavior-y: contain;
  scrollbar-color: #fafafb transparent;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 12px;
    height: 18px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 6px;
    border: 3px solid #fff;
    background-clip: padding-box;
    -webkit-border-radius: 100vh;
    background: ${({isHover, theme}: any) =>
      isHover ? '#f5f5fa' : theme.background};
    border-radius: 100vh;
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: red;
  }
  &::-webkit-scrollbar-track {
    background-clip: content-box;
    margin-top: 10px;
    margin-bottom: 10px;
    /* margin-bottom: 40vh; */
  }
`

const SideBar: React.FC = observer(() => {
  const [isHover, setHovered] = React.useState(false)
  const {layoutStore} = useRootStore()
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
