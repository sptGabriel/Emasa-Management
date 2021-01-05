import React from 'react'
import {useTheme} from '@emotion/react'
import {Outlet} from 'react-router-dom'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'
import DashBoardFooter from '../../shared/components/Footer'
import Header from '../../shared/components/Header'

interface SideBarState {
  open: boolean
  orientation: string
}

const DashBoardContainer = styled('div')<SideBarState>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`
const DashBoardMain = styled('div')<SideBarState>`
  background: ${({theme}: any) => `rgb(${theme.background})` || 'lightgrey'};
  display: grid;
  grid-template-columns: ${({open}) => (open ? '260px' : '70px')} auto;
  overflow: hidden;
`
export const OutletWrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 130px);
`
const Content = styled('div')`
  background: ${({theme}: any) => `rgb(${theme.background})` || 'lightgrey'};
  width: 100%;
  padding: 0 50px;
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

export const VerticalDashBoard: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const theme = useTheme()
  return (
    <DashBoardContainer
      orientation={layoutStore.layoutType}
      open={layoutStore.sideBar || layoutStore.onHoverSideState}
    >
      <Header />
      <DashBoardMain
        orientation={layoutStore.layoutType}
        open={layoutStore.sideBar || layoutStore.onHoverSideState}
        theme={theme}
      >
        <ASide />
        <Content>
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
          <DashBoardFooter orientation={layoutStore.layoutType}>
            .footer
          </DashBoardFooter>
        </Content>
      </DashBoardMain>
    </DashBoardContainer>
  )
})
