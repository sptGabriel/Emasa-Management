import React from 'react'
import {observer} from 'mobx-react-lite'
import {Sling as Hamburger} from 'hamburger-react'
import {useRootStore} from '../../infra/mobx'
import Widgets from '../Widgets'
import Logo from '../Logo'
import Search from '../Search'
import UserProfile from '../UserProfile'
import {LogoHeader, WrapperTools, NavBar} from './styles'

const Header: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <NavBar>
      <LogoHeader
        open={layoutStore.sideBar || layoutStore.onHoverSideState}
        align="center"
        justify={
          layoutStore.sideBar || layoutStore.onHoverSideState
            ? 'flex-start'
            : 'center'
        }
      >
        <Hamburger
          distance="sm"
          size={20}
          rounded
          label="Show menu"
          toggled={layoutStore.sideBar || layoutStore.onHoverSideState}
          onToggle={() => layoutStore.toggleSideBar()}
        />
        <Logo
          open={layoutStore.sideBar || layoutStore.onHoverSideState}
          orientation={layoutStore.layoutType}
        />
      </LogoHeader>
      <WrapperTools open={layoutStore.sideBar || layoutStore.onHoverSideState}>
        <Search />
        <Widgets />
        <UserProfile />
      </WrapperTools>
    </NavBar>
  )
})
export default Header
