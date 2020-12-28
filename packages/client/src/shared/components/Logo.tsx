import React from 'react'
import styled from '@emotion/styled/macro'
import {Container} from './FlexBox'
import logo from '../../assets/logoem.svg'
import {emasaAnimation} from '../../pages/login'
/* SideBar Styles Start */
export interface SideBarState {
  open?: boolean
}
const LogoWrapper = styled(Container)<SideBarState>`
  display: ${({open}) => (open ? 'flex' : 'none')};
  align-items: center;
  .text-5 {
    color: #0189cf;
    text-transform: uppercase;
    font-size: 1rem;
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
    width: 50px;
    vertical-align: middle;
    border-style: none;
  }
`
const Logo: React.FC<{open?: boolean}> = ({open}) => {
  return (
    <LogoWrapper open={open}>
      <img src={logo} alt="Emasa Logo" />
      <div className="text-5 text tooltip">
        <span>Emasa</span>
      </div>
    </LogoWrapper>
  )
}
export default Logo
