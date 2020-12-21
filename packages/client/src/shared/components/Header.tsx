import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {Container} from './FlexBox'
import logo from '../../assets/logoem.svg'
import NavBar from './NavBar'
import MenuBurguer from './Hamburguer'
import {useRootStore} from '../infra/mobx'
import {emasaAnimation} from '../../pages/login'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
const HeaderBox = styled(Container)`
  background-color: ${({theme}: any) => '#f5f5fa' || 'lightgrey'};
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 100;
`
const LogoWrapper = styled(Container)<SideBarState>`
  display: ${({open}) => (open ? 'flex' : 'none')};
  align-items: center;
  .text-5 {
    color: #0189cf;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
    animation: ${emasaAnimation} 1s linear infinite;
  }
  h1 {
    color: #fff;
    font-weight: bold;
    font-size: 1.4rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    text-transform: uppercase;
  }
  img {
    width: 60px;
    vertical-align: middle;
    border-style: none;
  }
`
const AppHeader = styled(Container)<SideBarState>`
  width: ${({open}) => (open ? '280px' : '60px')};
  height: 70px;
  padding: 0 1.5rem;
  background: #fff;
  visibility: visible;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`
const AppHeaderLogo: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <AppHeader
      open={layoutStore.sideBar}
      align="center"
      justify={layoutStore.sideBar ? 'space-between' : 'center'}
    >
      <LogoWrapper open={layoutStore.sideBar}>
        <img src={logo} alt="Emasa Logo" />
        <div className="text-5 text tooltip">
          <span>Emasa</span>
        </div>
      </LogoWrapper>
      <MenuBurguer />
    </AppHeader>
  )
})

const Header: React.FC = () => {
  return (
    <HeaderBox align="center">
      <AppHeaderLogo />
      <NavBar />
    </HeaderBox>
  )
}
export default Header
