import React from 'react'
import {useTheme} from '@emotion/react'
import {Outlet} from 'react-router-dom'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'
import DashBoardFooter from '../../shared/components/Footer'
import ToolsNav from '../../shared/components/ToolsNav'

export interface SideBarState {
  open: boolean
}
//  const DashBoardContainer = styled('div')`
//  display: grid;
//  grid-template-columns: 1fr;
//  grid-template-rows: 70px 1fr;
//  height: 100vh;
//  width: 100vw;
//  `
const DashBoardContainer = styled('div')<SideBarState>`
  display: grid;
  grid-template-columns: ${({open}) => (open ? '280px' : '60px')} auto;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`
const DashBoardMain = styled('div')<SideBarState>`
  background: ${({theme}: any) => theme.backgroundSecondary || 'lightgrey'};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  width: 100%;
`
export const OutletWrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 130px);
`
const Content = styled('div')`
  background: ${({theme}: any) => theme.backgroundSecondary || 'lightgrey'};
  width: 100%;
  position: relative;
  overflow-y: auto;
  //  padding-right: 30px;
  //  padding-left: 30px;
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 25px 25px transparent;
    border: solid 3px transparent;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  p {
    max-width: 600px;
  }
`

const DashBoard: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const theme = useTheme()
  return (
    <DashBoardContainer open={layoutStore.sideBar}>
      <ASide />
      <DashBoardMain open={layoutStore.sideBar} theme={theme}>
        <ToolsNav />
        <Content>
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
          <DashBoardFooter>.footer</DashBoardFooter>
        </Content>
      </DashBoardMain>
    </DashBoardContainer>
  )
})

export default DashBoard
