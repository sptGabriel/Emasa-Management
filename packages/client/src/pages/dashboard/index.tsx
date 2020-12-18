import React from 'react'
import {useTheme} from '@emotion/react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import Header from '../../shared/components/Header'
import {useRootStore} from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'

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
  overflow-y: auto;
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
    <DashBoardContainer>
      <Header />
      <DashBoardBody open={layoutStore.sideBar}>
        <ASide />
        <DashBoardContent theme={theme}>
          {/* <DashBoardFooter>.footer</DashBoardFooter> */}
        </DashBoardContent>
      </DashBoardBody>
    </DashBoardContainer>
  )
})

export default DashBoard
