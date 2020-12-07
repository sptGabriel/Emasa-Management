/** @jsxImportSource @emotion/react */
import React from 'react'
import styled from '@emotion/styled/macro'
import { css } from '@emotion/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { flex } from 'styled-system'
import { observer } from 'mobx-react-lite'
import { Container } from './FlexBox'
import Search from './SearchBox'
import MenuBurguer from './Hamburguer'
import { useRootStore } from '../infra/mobx'
import ToolsNav from './ToolsNav'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
const Nav = styled(Container)<SideBarState>`
  width: ${({ open }) => (open ? 'calc(100% - 250px)' : 'calc(100% - 60px)')};
  position: relative;
  transition: all 0.2s ease;
  height: 100%;
`
const navLeft = css`
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
const navLi = css`
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
      <div css={navLeft}>
        <li css={navLi}>
          <Search />
        </li>
      </div>
      <ToolsNav />
    </Nav>
  )
})

export default NavBar
