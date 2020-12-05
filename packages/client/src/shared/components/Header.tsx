import React from 'react'
import styled from '@emotion/styled/macro'
import { Container } from './FlexBox'
import logo from '../../assets/logo_emasa.png'
import NavBar from './NavBar'
/* SideBar Styles Start */
const Header = styled(Container)`
  background-color: rgb(255, 255, 255);
  height: 70px;
  line-height: 70px;
  align-content: center;
  padding: 0;
  width: 100%;
  position: fixed;
  left: 0;
  z-index: 1030;
  box-shadow: 0 0.46875rem 2.1875rem rgba(4, 9, 20, 0.03),
    0 0.9375rem 1.40625rem rgba(4, 9, 20, 0.03),
    0 0.25rem 0.53125rem rgba(4, 9, 20, 0.05),
    0 0.125rem 0.1875rem rgba(4, 9, 20, 0.03);
  transition: all 0.2s;
`
const LogoWrapper = styled(Container)`
  width: 250px;
  height: 70px;
  padding: 0 1rem;
  background-color: transparent;
  transition: all 0.2s ease;
  img {
    width: 60px;
    vertical-align: middle;
    border-style: none;
  }
`
const DashBoardHeader: React.FC = () => {
  return (
    <Header align="center">
      <LogoWrapper align="center">
        <img src={logo} alt="Emasa Logo" />
      </LogoWrapper>
      <NavBar />
    </Header>
  )
}

export default DashBoardHeader
