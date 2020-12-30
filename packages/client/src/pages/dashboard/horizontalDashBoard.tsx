import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../../shared/infra/mobx'
import DashBoardFooter from '../../shared/components/Footer'
import NavBar from '../../shared/components/NavBar'

interface SideBarState {
  open?: boolean
  orientation?: string
}

const DashBoardContainer = styled('div')<SideBarState>`
  height: 100vh;
  width: 100vw;
  position: relative;
`
const DashBoardMain = styled('div')<SideBarState>`
  width: 100%;
  display: grid;
  min-height: calc(100vh - 60px);
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 70px;
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

export const HorizontalDashBoard: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const [isSticky, setSticky] = useState(false)
  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 70) {
      setSticky(true)
    } else {
      setSticky(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])
  return (
    <DashBoardContainer
      orientation={layoutStore.layoutType}
      open={layoutStore.sideBar || layoutStore.onHoverSideState}
    >
      <NavBar isSticky={isSticky} />
      <DashBoardMain>
        <div
          style={{
            minHeight: '1500px',
            background: 'rgb(242, 246, 249)',
            padding: '100px 0',
          }}
        >
          test
        </div>
        <DashBoardFooter>.footer</DashBoardFooter>
      </DashBoardMain>
    </DashBoardContainer>
  )
})
