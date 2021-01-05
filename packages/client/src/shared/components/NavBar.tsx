import React from 'react'
import {css, keyframes, useTheme} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import Widgets from './Widgets'
import Logo from './Logo'
import UserProfile from './UserProfile'
import MenuTags from './NavMenu'
/* SideBar Styles Start */
interface SideBarState {
  open: boolean
}
const navAnimation = keyframes`
	0%{
		height: 80px;
	}
	100%{
		height: 70px;
	}
`
const ToolsBar = styled('div')<{isSticky: boolean}>`
  display: flex;
  background: ${({theme}: any) => `rgb(${theme.backgroundSecondary})`};
  height: 110px;
  ${({isSticky, theme}: any) =>
    isSticky
      ? css`
          display: flex;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: ${`rgb(${theme.primary})`};
          animation: ${navAnimation} 0.15s forwards;
        `
      : ''}
`
const Tools: React.FC<{isSticky: boolean; orientation: string}> = ({
  isSticky,
  orientation,
}) => {
  return (
    <ToolsBar isSticky={isSticky}>
      <Container
        wrap="no-wrap"
        justify="space-between"
        style={{
          maxWidth: '1140px',
          width: '100%',
          padding: '0 12px',
          height: '100%',
          margin: '0 auto',
          flex: '1 1 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo orientation={orientation} />
        </div>
        <div style={{display: 'flex', height: '100%'}}>
          <Widgets />
          <UserProfile />
        </div>
      </Container>
    </ToolsBar>
  )
}

const Menu: React.FC<{isSticky: boolean}> = ({isSticky}) => {
  return <MenuTags isSticky={isSticky} />
}

const NavBar: React.FC<{
  isSticky: boolean
  orientation: string
}> = ({isSticky, orientation}) => {
  return (
    <>
      <Tools isSticky={isSticky} orientation={orientation} />
      <Menu isSticky={isSticky} />
    </>
  )
}
export default NavBar
