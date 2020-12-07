/** @jsxImportSource @emotion/react */
import React from 'react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { css } from '@emotion/react'
import {
  VscRocket,
  VscChevronUp,
  VscChevronDown,
  VscDashboard
} from 'react-icons/vsc'
import { AiOutlineDashboard } from 'react-icons/ai'

import { useRootStore } from '../infra/mobx'
import MenuTags from './Tags'

interface SideBarState {
  open: boolean
}
/* SideBar Styles Start */
const MenuUL = styled('ul')<SideBarState>`
  width: 100%;
  list-style: none;
  position: relative;
  padding-top: 10px;
`
const MenuItem = styled('div')`
  width: 100%;
  display: flex;
  font-size: 0.8rem;
  margin: 0.75rem 0;
  background: rgba(62, 130, 247, 0.1);
  white-space: nowrap;
  position: relative;
  ::after {
    border-right: 3px solid #3e82f7;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    content: '';
    transform: scaleY(1);
    opacity: 1;
  }
`
const MenuLI = styled('li')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  padding-left: 1.5rem !important;
  padding-right: 1rem !important;
  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    font-variant: tabular-nums;
    font-feature-settings: 'tnum', 'tnum';
    font-size: 0.875rem;
    color: rgba(26, 51, 83, 0.85) !important;
    opacity: 0.8;
    font-family: 'Roboto';
    svg {
      margin-right: 10px;
      opacity: 0.7;
    }
  }
`
const SideMenu: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return <MenuTags />
})

export default SideMenu
