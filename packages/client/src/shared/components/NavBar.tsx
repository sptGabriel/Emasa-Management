import React from 'react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { Container } from './FlexBox'
import Search from './SearchBox'
import { useRootStore } from '../infra/mobx'
import ToolsNav from './ToolsNav'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
const Nav = styled(Container)<SideBarState>`
  width: ${({ open }) => (open ? 'calc(100% - 280px)' : 'calc(100% - 60px)')};
  position: relative;
  transition: all 0.2s ease;
  height: 100%;
`
const NavLeft = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border-bottom: 0;
  box-shadow: none;
`

// const navRight = css`
//   margin-left: auto;
//   padding: 0 1rem;
//   display: flex;
//   background: red;
// `
const NavLi = styled('li')`
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
`
const NavBar: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return (
    <Nav justify="space-between" open={layoutStore.sideBar}>
      <NavLeft />
      <ToolsNav />
    </Nav>
  )
})

export default NavBar
