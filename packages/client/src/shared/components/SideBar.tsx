import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import SideMenu from './SideMenu'
import AppHeaderLogo from './Header'

interface sideStat {
  sideisOpen: boolean
}
const SideBarContainer = styled(Container)<sideStat>`
  width: 100%;
  height: 100vh;
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  /* box-shadow: ${({theme}: any) =>
    theme.type === 'dark'
      ? '0 0 4px 0 rgba(89, 102, 122, 0.1)'
      : '0 0 15px 0 rgba(0,0,0,.05)'}; */
  background: ${({theme}: any) => theme.background || '#fff'};
`

const SideBar: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <SideBarContainer
      flexColumn
      sideisOpen={layoutStore.sideBar}
    >
      <AppHeaderLogo />
      <SideMenu />
    </SideBarContainer>
  )
})

export default SideBar
