import React, {useState} from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import Switch from 'react-switch'
import {css} from '@emotion/react'
import {Divide as Hamburger} from 'hamburger-react'
import {Container} from './FlexBox'
import logo from '../../assets/logoem.svg'
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
  width: ${({open}) => (open ? '280px' : '60px')};
  height: 70px;
  ${({open}) =>
    open
      ? css`
          padding: 0 0.5rem 0 0.5rem;
        `
      : ''}
  background: ${({theme}: any) => theme.background};
  border-right: 1px solid rgba(0, 0, 0, 0.06);
`
const AppHeaderLogo: React.FC = observer(() => {
  const {layoutStore} = useRootStore()
  const [checked, setChecked] = useState(true)
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
      <Hamburger
        distance="sm"
        size={18}
        rounded
        label="Show menu"
        toggled={layoutStore.sideBar}
        onToggle={() => layoutStore.toggleSideBar()}
      />
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
