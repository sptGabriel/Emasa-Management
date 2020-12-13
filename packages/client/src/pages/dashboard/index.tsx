import React from 'react'
import { Theme, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import Header from '../../shared/components/Header'
import { useRootStore } from '../../shared/infra/mobx'
import ASide from '../../shared/components/SideBar'
import { ITheme } from '../../shared/themes'

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
const DashBoardHeader = styled('div')`
  border-bottom: 1px solid lightgrey;
`
const DashBoardBody = styled('div')<SideBarState>`
  display: grid;
  grid-template-columns: ${({ open }) => (open ? '280px' : '60px')} auto;
  overflow: hidden;
`
const DashBoardSide = styled('div')`
  border-right: 1px solid lightgrey;
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 25px 25px transparent;
    border: solid 3px transparent;
  }
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`
const DashBoardContent = styled('div')<{ theme: any }>`
  border-right: 1px solid lightgrey;
  background: ${({ theme }) => theme.backgroundSecondary || 'lightgrey'};
  overflow-y: scroll;
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
const DashBoardFooter = styled('div')`
  background: red;
`
const DashBoard: React.FC = observer((props) => {
  const { layoutStore } = useRootStore()
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
