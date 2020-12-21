import React from 'react'
import {useTheme} from '@emotion/react'
import {Outlet} from 'react-router-dom'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import Header from '../../shared/components/Header'
import {useRootStore} from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'
import DashBoardFooter from '../../shared/components/Footer'

export interface SideBarState {
  open: boolean
}
const DashBoardContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  width: 100vw;
`
const DashBoardBody = styled('div')<SideBarState>`
  display: grid;
  grid-template-columns: ${({open}) => (open ? '280px' : '60px')} auto;
  overflow: hidden;
`
const DashBoardContent = styled('div')<{theme: any}>`
  background: ${({theme}) => theme.backgroundSecondary || 'lightgrey'};
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 30px;
  padding-left: 30px;
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
export const OutletWrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 130px);
`

const DashBoard: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const theme = useTheme()
  return (
    <DashBoardContainer>
      <Header />
      <DashBoardBody open={layoutStore.sideBar}>
        <ASide />
        <DashBoardContent theme={theme}>
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
          <DashBoardFooter>.footer</DashBoardFooter>
        </DashBoardContent>
      </DashBoardBody>
    </DashBoardContainer>
  )
})

export default DashBoard
