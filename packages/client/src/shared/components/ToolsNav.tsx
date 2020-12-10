import React from 'react'
import styled from '@emotion/styled/macro'
import { observer } from 'mobx-react-lite'
import { CgLogOff } from 'react-icons/cg'
import { Container } from './FlexBox'
import { useRootStore } from '../infra/mobx'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}
const WrapperTools = styled(Container)<SideBarState>`
  padding: 0 1rem;
  display: flex;
  align-items: center;
  display: flex;
  margin-left: auto;
`
const LogoutWidget = styled('div')`
  padding: 0 1rem;
  margin: 0;
  button {
    display: flex;
    align-items: center;
  }
  svg {
    color: #3e82f7;
    :hover {
      color: #bde0fe;
      opacity: 0.6;
    }
  }
`
const ToolsNav: React.FC = observer(() => {
  const { layoutStore } = useRootStore()
  return (
    <WrapperTools justify="space-between" open={layoutStore.sideBar}>
      <LogoutWidget>
        <button type="button">
          <CgLogOff size={32} />
        </button>
      </LogoutWidget>
    </WrapperTools>
  )
})

export default ToolsNav
