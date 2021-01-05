import React from 'react'
import styled from '@emotion/styled/macro'
import {Container} from './FlexBox'
import logo from '../../assets/logoem.svg'
import {emasaAnimation} from './LogoAnimation'
/* SideBar Styles Start */
export interface SideBarState {
  open?: boolean
  orientation?: string
}
const LogoWrapper = styled(Container)<SideBarState>`
  display: ${({open, orientation}) =>
    open || orientation === 'horizontal' ? 'flex' : 'none'};
  align-items: center;
  .text-5 {
    color: ${({orientation}) =>
      orientation === 'horizontal' ? '#fff' : '#0189cf'};
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
const Logo: React.FC<{open?: boolean; orientation: string}> = ({
  open,
  orientation,
}) => {
  return (
    <LogoWrapper open={open} orientation={orientation}>
      <img src={logo} alt="Emasa Logo" />
      <div className="text-5 text tooltip">
        <span>Emasa</span>
      </div>
    </LogoWrapper>
  )
}
export default Logo
