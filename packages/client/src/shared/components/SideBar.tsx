import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {runInAction} from 'mobx'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import SideMenu from './SideMenu'

interface sideStat {
  sideisOpen: boolean
}
const SideBarContainer = styled(Container)<sideStat>`
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({theme}: any) => `rgb(${theme.background})`};
  overflow-y: auto;
  transition: 0.2s;
  transition-timing-function: ease;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  scrollbar-color: auto;
  scrollbar-width: thin;
  padding: 10px 15px;
  &::-webkit-scrollbar {
    width: ${({sideisOpen}) => (sideisOpen ? '10px' : '0')};
    height: ${({sideisOpen}) => (sideisOpen ? '14px ' : '0')};
  }
  &::-webkit-scrollbar-thumb:vertical {
    height: 6px;
    border: 3px solid ${({theme}: any) => `rgba(${theme.background})`};
    background-clip: padding-box;
    background: ${({theme}: any) => `rgba(${theme.backgroundSecondary})`};
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
  const {layoutStore} = useRootStore()
  const [isHover, setHovered] = React.useState(false)
  return (
    <SideBarContainer
      flexColumn
      sideisOpen={layoutStore.sideBar}
      onMouseOver={() => {
        setHovered(true)
        runInAction(() => {
          if (!layoutStore.sideBar) layoutStore.onHoverSideState = true
        })
      }}
      onMouseOut={() => {
        setHovered(false)
        runInAction(() => {
          if (!layoutStore.sideBar) layoutStore.onHoverSideState = false
        })
      }}
    >
      <SideMenu hover={isHover} />
    </SideBarContainer>
  )
})

export default SideBar
