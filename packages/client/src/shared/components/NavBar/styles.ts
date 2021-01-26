import {css, keyframes} from '@emotion/react'
import styled from '@emotion/styled'
import {animated} from 'react-spring'

export const navAnimation = keyframes`
	0%{
		height: 80px;
	}
	100%{
		height: 70px;
	}
`
export const ToolsBar = styled('div')<{isSticky: boolean}>`
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

//  menu start
export const Ul = styled('ul')<{isSticky: boolean}>`
  display: flex;
  flex-wrap: wrap;
  align-items: ${({isSticky}) => (isSticky ? 'flex-start' : 'flex-end')};
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  width: 100%;
  height: 100%;
  z-index: 99;
`
export const Menu = styled('div')<{isSticky: boolean}>`
  display: flex;
  align-items: center;
  width: 100% !important;
  height: 70px;
  position: relative;
  background: ${({theme}: any) => `rgb(${theme.navBar.background})`};
  box-shadow: 11px 0 0 rgba(0, 0, 0, 0.13);
`

export const DropDown = styled(animated.ul)<{activetag: any}>`
  position: absolute;
  flex-direction: column;
  display: ${({activetag}) => (activetag ? 'block' : 'none')};
  top: 104%;
  padding: 15px 0;
  min-width: 215px;
  min-height: 52px;
  background: ${({theme}: any) => `rgb(${theme.navBar.dropdownBg})`};
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.24);
  z-index: 999;
  border-radius: 4px;
  .dropdown-wrap {
    &:hover {
      .svg-drop,
      .tag-optname {
        transform: translateX(5px);
      }
    }
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
  }
  .tag-optname {
    display: block;
    color: ${({theme}: any) => `rgb(${theme.navBar.dropdownTxt})`};
    font-size: 1rem;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 400;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .svg-drop {
    width: 10px;
    height: 10px;
    stroke: ${({theme}: any) => `rgb(${theme.navBar.dropdownTxt})`};
    margin-right: 0.75rem !important;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .active-dropheader {
    background: ${({theme}: any) => `rgb(${theme.navBar.dropdownBgOptActive})`};
    .svg-drop {
      stroke: ${({theme}: any) => `rgb(${theme.navBar.dropdownTextOptActive})`};
    }
    .tag-optname {
      color: ${({theme}: any) => `rgb(${theme.navBar.dropdownTextOptActive})`};
    }
  }
`

export const NavItem = styled.li<{isDropDown?: boolean; activetag: any}>`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 0.75rem;
  .active {
    /* background: #2a2a72; */
    background: ${({theme}: any) => `rgb(${theme.navBar.activeBgButton})`};
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: ${({theme}: any) => `rgb(${theme.navBar.text})`};
    cursor: pointer;
    border-radius: 0.42rem;
    padding: 0.65rem 1rem;
    .tag-svg {
      margin-right: 10px;
    }
    .tag-name {
      color: ${({theme}: any) => `rgb(${theme.navBar.text})`};
      font-weight: 500;
      font-size: 1rem;
      line-height: 1.5;
      text-transform: initial;
      font-family: Poppins, Helvetica, sans-serif;
    }
  }
  .svg-arrow {
    margin-left: 6px;
    display: flex;
    align-items: center;
  }
`
//  menu end
