import React, {useEffect} from 'react'
import {css, useTheme} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {observer} from 'mobx-react-lite'
import {useRootStore} from '../infra/mobx'
import {Container} from './FlexBox'
import {HorizontalWidgets} from './Widgets'
import Logo from './Logo'
import Search from './SearchBox'
import UserProfile from './UserProfile'
import MenuTags from './NavMenu'
/* SideBar Styles Start */
export interface SideBarState {
  open: boolean
}

const ToolsBar = styled('div')<{isSticky: boolean}>`
  display: ${({isSticky}) => (isSticky ? 'none' : 'flex')};
  background: #0d3b66;
  height: 110px;
`
// const NavContainer = styled('div')<{isSticky: boolean}>`
//   display: flex;
//   width: 100%;
//   height: 60px;
//   background: ${({theme}: any) => `rgb(${theme.backgroundSecondary})`};
//   ${({isSticky}) =>
//     isSticky
//       ? css`
//           position: fixed;
//           top: 0;
//           left: 0;
//           border-bottom: 1px solid #ebedf2;
//           animation: ${navAnimation} 0.15s forwards;
//         `
//       : ''}
// `
const Tools: React.FC<{isSticky: boolean; orientation: string}> = observer(
  ({isSticky, orientation}) => {
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
            <HorizontalWidgets />
            <UserProfile />
          </div>
        </Container>
      </ToolsBar>
    )
  },
)

const Menu: React.FC<{isSticky: boolean}> = observer(({isSticky}) => {
  useEffect(() => {
    console.log(isSticky)
  }, [isSticky])
  return <MenuTags isSticky={isSticky} />
})

const NavBar: React.FC<{isSticky: boolean}> = observer(({isSticky}) => {
  const {layoutStore} = useRootStore()
  const theme: any = useTheme()
  return (
    <>
      <Tools isSticky={isSticky} orientation={layoutStore.layoutType} />
      <Menu isSticky={isSticky} />
    </>
  )
})
export default NavBar
