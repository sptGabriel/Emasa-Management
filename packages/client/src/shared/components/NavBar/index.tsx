import React from 'react'
import {Container} from '../FlexBox'
import Widgets from '../Widgets'
import Logo from '../Logo'
import UserProfile from '../UserProfile'
import MenuTags from './NavMenu'
import { ToolsBar } from './styles'
/* SideBar Styles Start */
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
