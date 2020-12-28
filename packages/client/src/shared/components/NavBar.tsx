import React from 'react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {css} from '@emotion/react'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import {HorizontalWidgets} from './Widgets'
import Logo from './Logo'
import Search from './SearchBox'
import UserProfile from './UserProfile'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}

const ToolsBar = styled('div')<{isSticky: boolean}>`
  display: ${({isSticky}) => (isSticky ? 'none' : 'flex')};
  height: 70px;
  background: ${({theme}: any) => `rgb(${theme.background})`};
`
const NavContainer = styled('div')<{isSticky: boolean}>`
  display: flex;
  width: 100%;
  height: 60px;
  background: ${({theme}: any) => `rgb(${theme.backgroundSecondary})`};
  ${({isSticky}) =>
    isSticky
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          background-color: green;
          border-bottom: 1px solid #ebedf2;
        `
      : ''}
`
const Tools: React.FC<{isSticky: boolean}> = ({isSticky}) => {
  return (
    <ToolsBar isSticky={isSticky}>
      <Container
        wrap="no-wrap"
        justify="space-between"
        style={{
          maxWidth: '1140px',
          width: '100%',
          margin: '0 auto',
          flex: '1 1 auto',
        }}
      >
        <div style={{display: 'flex', height: '100%'}}>
          <Logo />
        </div>
        <div style={{display: 'flex', height: '100%'}}>
          <Search />
          <HorizontalWidgets />
          <UserProfile />
        </div>
      </Container>
    </ToolsBar>
  )
}

const Menu: React.FC<{isSticky: boolean}> = ({isSticky}) => {
  return <NavContainer isSticky={isSticky}>Nav</NavContainer>
}

const NavBar: React.FC<{isSticky: boolean}> = observer(({isSticky}) => {
  const {layoutStore} = useRootStore()
  return (
    <>
      <Tools isSticky={isSticky} />
      <Menu isSticky={isSticky} />
    </>
  )
})
export default NavBar
