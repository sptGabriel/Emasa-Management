import React from 'react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { Container } from './FlexBox'
import logo from '../../assets/logoem.svg'
import NavBar from './NavBar'
import MenuBurguer from './Hamburguer'
import { useRootStore } from '../infra/mobx'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
const HeaderBox = styled(Container)`
  background-color: ${({ theme }: any) => theme.background || 'lightgrey'};
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  box-shadow: 0 1px 4px -1px rgba(0, 0, 0, 0.15);
  transition: all 0.2s;
  z-index: 100;
`
const LogoWrapper = styled(Container)<SideBarState>`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
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
  width: ${({ open }) => (open ? '280px' : '60px')};
  height: 70px;
  padding: 0 1.5rem;
  background-color: transparent;
  transition: width 0.2s;
  visibility: visible;
`
const AppHeaderLogo: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return (
    <AppHeader
      open={layoutStore.sideBar}
      align="center"
      justify="space-between"
    >
      <LogoWrapper open={layoutStore.sideBar}>
        <img src={logo} alt="Emasa Logo" />
        <h1>Emasa</h1>
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
