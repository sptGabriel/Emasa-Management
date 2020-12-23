import React, {useState} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import Switch from 'react-switch'
import {css} from '@emotion/react'
import {Sling as Hamburger} from 'hamburger-react'
import {Container} from './FlexBox'
import logo from '../../assets/logoem.svg'
import {useRootStore} from '../infra/mobx'
import {emasaAnimation} from '../../pages/login'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
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
const AppHeader = styled(Container)<SideBarState>`
  width: ${({open}) => (open ? '280px' : '72px')};
  height: 70px;
  margin-bottom: 20px !important;
  .hamburger-react {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100vh;
    position: relative;
    padding: 0;
    width: 35px !important;
    height: 35px !important;
    margin-right: ${({open}) => (open ? '16px' : '0')};
    ${({open}) =>
      open
        ? css`
            transform: translateX(-10px) !important;
          `
        : ''};
    :hover {
      color: #00d4ff;
    }
    :active {
      background: #eee;
    }
    & > div {
      left: calc(50% - 9.5px) !important;
      right: 0;
    }
    div:nth-of-type(1) {
      top: calc(50% - 6px) !important;
    }
    div:nth-of-type(2) {
      top: calc(50% - 1px) !important;
    }
    div:nth-of-type(3) {
      top: calc(50% + 4px) !important;
    }
  }
  ${({open}) =>
    open
      ? css`
          padding: 0 24px 0 24px;
        `
      : ''}
  background: ${({theme}: any) => theme.background};
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`
const AppHeaderLogo: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  return (
    <AppHeader
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
        color="#0079db"
        size={20}
        rounded
        label="Show menu"
        toggled={layoutStore.sideBar || layoutStore.onHoverSideState}
        onToggle={() => layoutStore.toggleSideBar()}
      />
      <LogoWrapper open={layoutStore.sideBar || layoutStore.onHoverSideState}>
        <img src={logo} alt="Emasa Logo" />
        <div className="text-5 text tooltip">
          <span>Emasa</span>
        </div>
      </LogoWrapper>
      {/* <Switch
        onChange={() => layoutStore.toggleSideBar()}
        checked={layoutStore.sideBar}
        offColor="#86889A"
        offHandleColor="#F5F5FA"
        onColor="#2693e6"
        onHandleColor="#86d3ff"
        handleDiameter={20}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 2px 1px -1px rgba(0, 0, 0, 0.06),0px 1px 1px 0px rgba(0, 0, 0, 0.042),0px 1px 3px 0px rgba(0, 0, 0, 0.036)"
        activeBoxShadow="0px 0px 1px 8px rgba(215, 215, 224, 0.2)"
        height={14}
        width={34}
        className="react-switch"
        id="material-switch"
      />  */}
    </AppHeader>
  )
})
export default AppHeaderLogo
