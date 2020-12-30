import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {runInAction} from 'mobx'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import SideMenu from './SideMenu'

interface sideStat {
  sideisOpen: boolean
  hover: boolean
}
const SideBarContainer = styled(Container)<sideStat>`
  width: 100%;
  height: 100%;
  background: ${({theme}: any) => `rgb(${theme.background})`};
  padding: 0px 4px;
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.13);
`

const SideBar: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const [isHover, setHovered] = React.useState(false)
  return (
    <SideBarContainer
      flexColumn
      hover={isHover}
      sideisOpen={layoutStore.sideBar || layoutStore.onHoverSideState}
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
