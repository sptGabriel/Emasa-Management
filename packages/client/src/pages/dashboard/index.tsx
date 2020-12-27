import React, {useEffect} from 'react'
import {css, useTheme} from '@emotion/react'
import {Outlet} from 'react-router-dom'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'
import DashBoardFooter from '../../shared/components/Footer'
import ToolsNav from '../../shared/components/ToolsNav'
import GearTheming from '../../shared/components/GearTheming'
import ThemingSideBar from '../../shared/components/ThemeSideBox'
import Header from '../../shared/components/Header'

export interface SideBarState {
  open: boolean
  orientation: string
}

const DashBoardContainer = styled('div')<SideBarState>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${({orientation}) =>
    orientation === 'vertical' ? '70px 1fr' : '70px 60px 1fr 60px'};
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
`
const DashBoardMain = styled('div')<SideBarState>`
  background: ${({theme}: any) => `rgb(${theme.background})` || 'lightgrey'};
  display: grid;
  ${({open, orientation}) =>
    orientation === 'vertical'
      ? css`
          grid-template-columns: ${open ? '280px' : '60px'} auto;
        `
      : ''}
  overflow: hidden;
`
export const OutletWrapper = styled('div')`
  width: 100%;
  min-height: calc(100vh - 130px);
`
const Content = styled('div')`
  background: ${({theme}: any) =>
    `rgb(${theme.backgroundSecondary})` || 'lightgrey'};
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
    <>
      <ThemingSideBar />
      <DashBoardContainer
        orientation={layoutStore.layoutType}
        open={layoutStore.sideBar || layoutStore.onHoverSideState}
      >
        <Header />
        {layoutStore.layoutType === 'horizontal' ? <ASide /> : ''}
        <DashBoardMain
          orientation={layoutStore.layoutType}
          open={layoutStore.sideBar || layoutStore.onHoverSideState}
          theme={theme}
        >
          {layoutStore.layoutType === 'vertical' ? <ASide /> : ''}
          <Content>
            <OutletWrapper>
              <Outlet />
            </OutletWrapper>
          </Content>
        </DashBoardMain>
        <DashBoardFooter>.footer</DashBoardFooter>
      </DashBoardContainer>
    </>
  )
})

export default DashBoard
