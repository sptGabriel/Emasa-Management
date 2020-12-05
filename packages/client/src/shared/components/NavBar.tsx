/** @jsxImportSource @emotion/react */
import React from 'react'
import styled from '@emotion/styled/macro'
import { css } from '@emotion/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { flex } from 'styled-system'
import { Container } from './FlexBox'
import Search from './SearchBox'
import MenuBurguer from './Hamburguer'
/* SideBar Styles Start */
const NavLeft = styled('ul')`
  display: flex;
  align-items: center;
  border-bottom: 0;
  box-shadow: none;
  white-space: nowrap;
`

const NavRight = styled('div')`
  margin-left: auto;
  padding: 0 1rem;
  display: flex;
  background: red;
`
const Nav = styled(Container)`
  width: calc(100% - 250px);
  position: relative;
  transition: all 0.2s ease;
`
const NavBar: React.FC = () => {
  return (
    <Nav justify="space-between">
      <NavLeft>
        <li
          css={{
            position: 'relative',
            display: 'flex',
            alignItem: 'center',
            padding: ' 0 1rem'
          }}
        >
          <MenuBurguer />
        </li>
        <li css={{ position: 'relative', padding: ' 0 1rem' }}>
          <Search />
        </li>
      </NavLeft>
      <NavRight>b</NavRight>
    </Nav>
  )
}

export default NavBar
