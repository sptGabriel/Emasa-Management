import React from 'react'
import styled from '@emotion/styled/macro'
import { GoHome } from 'react-icons/go'
import { Container, FlexDynamicCSS } from './FlexBox'
import SideMenu from './SideMenu'

interface IsHover {
  isHover: boolean
}
/* SideBar Styles Start */
const SideBarContainer = styled(Container)<IsHover>`
  width: 100%;
  position: relative;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  background: #fff;
`

const SideBar: React.FC = () => {
  const [isHover] = React.useState(false)

  return (
    <SideBarContainer flexColumn isHover={isHover}>
      <SideMenu />
    </SideBarContainer>
  )
}

export default SideBar
