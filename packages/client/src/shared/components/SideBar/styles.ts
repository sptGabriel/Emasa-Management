import styled from '@emotion/styled'
import {animated} from 'react-spring'

type IMenu = {
  open: boolean
  hover: boolean
}
interface IListItem {
  open: boolean
  isDropDown?: boolean
  activetag: any
}

export const MenuList = styled.ul<IMenu>`
  color: transparent;
  height: 100%;
  width: inherit;
  padding-right: 11px;
  padding-left: 11px;
  overflow-y: scroll;
  padding-top: 25px;
  padding-bottom: 25px;
  padding-left: ${({open}) => (open ? '11px' : '15px')};
  padding-right: ${({open}) => (open ? '8px' : '15px')};
  scrollbar-color: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: ${({open}) => (open ? '5px' : '0')};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:vertical {
    border-radius: 10px;
    background: ${({theme, hover, open}: any) =>
      `rgba(${theme.sideBar.scrollBar})`};
    /* border-left: 6px solid ${({theme}: any) =>
      `rgba(${theme.background})`}; */
    /* border-right: 2px solid ${({theme}: any) => `rgba(${theme.background})`};
    background-clip: padding-box;
    background: ${({theme, hover, sideisOpen}: any) =>
      hover && sideisOpen ? `#9c9c9c` : `rgba(${theme.background})`};
    border-radius: 4px; */
  }
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: red;
  }
  &::-webkit-scrollbar-track {
    background-clip: content-box;
  }
  .title_tagList {
    display: ${({open}) => (open ? 'block' : 'none')};
    opacity: ${({open}) => (open ? '1' : '0')};
    padding: 12px 18px;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
    align-items: center;
    position: relative;
    border-radius: 0.25rem;
    color: ${({theme}: any) => `rgb(${theme.sideBar.tagTittle})`};
    font-size: 0.9rem;
    font-weight: 500;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
`

export const DropDown = styled(animated.ul)<{activetag: any; open: boolean}>`
  position: relative;
  flex-direction: column;
  padding: ${({activetag, open}) =>
    activetag && open ? '0.8rem 4px 5px 2.5rem !important' : '0'};
  .dropdown-wrap {
    &:hover {
      .svg-drop,
      .tag-optname {
        transform: translateX(5px);
      }
    }
  }
  :after {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    width: 1px;
    height: calc(100% - 1.20625rem - 4.34px);
    background: rgba(185, 199, 212, 0.5);
  }
  .dropdown-tag {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 8px 0;
    ::after {
      content: '';
      position: absolute;
      transform: translateY(-50%);
      left: 21px;
      width: 19px;
      height: 1px;
      background: rgba(185, 199, 212, 0.5);
    }
  }
  .tag-optname {
    display: block;
    color: ${({theme}: any) => `rgb(${theme.sideBar.tagName})`};
    letter-spacing: 0.7px;
    font-family: Roboto;
    font-size: 0.9rem;
    text-transform: capitalize;
    font-weight: 400;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .svg-drop {
    width: 10px;
    height: 10px;
    stroke: ${({theme}: any) => `rgb(${theme.sideBar.tagIcon})`};
    margin-right: 18px;
    margin-left: 10px;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
`

export const ListItem = styled.li<IListItem>`
  display: block;
  cursor: pointer;
  margin-bottom: 7px;
  :focus {
    outline: none; /* no outline - for most browsers */
    box-shadow: none; /* no box shadow - for some browsers or if you are using Bootstrap */
  }
  &:hover {
    .svg-main,
    .tag-name {
      transform: translateX(5px);
    }
  }
  .tag-container {
    width: 100%;
    border: none !important;
    z-index: 1;
  }
  .active-dropheader {
    background: ${({theme}: any) =>
      `linear-gradient(118deg,rgba(${theme.primary},1),rgba(${theme.primary},0.7))`};
    box-shadow: ${({theme}: any) => `0 0 5px 1px rgba(${theme.primary},0.7)`};
    .tag-optname {
      color: #fff !important;
    }
    .svg-drop {
      stroke-width: 3px;
      stroke: #fff !important;
    }
  }
  .active {
    background: ${({theme}: any) =>
      `linear-gradient(118deg,rgba(${theme.primary},1),rgba(${theme.primary},0.7))`} !important;
    box-shadow: ${({theme}: any) =>
      `0 0 5px 1px rgba(${theme.primary},0.7)`} !important;
    .tag-name {
      color: #fff !important;
    }
    .svg-main {
      fill: #fff !important;
    }
  }
  .svg-arrow {
    position: absolute;
    top: calc(50% - 8px);
    left: 200px;
    color: ${({theme}: any) => `rgb(${theme.sideBar.tagIcon})`};
  }
  .tag-name {
    display: ${({open}) => (open ? 'space-between' : 'none')};
    color: ${({theme}: any) => `rgb(${theme.sideBar.tagName})`};
    line-height: 1.8rem;
    letter-spacing: 0.7px;
    font-family: Roboto;
    text-transform: capitalize;
    font-weight: 400;
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .svg-main {
    width: 24px;
    height: 24px;
    fill: ${({theme}: any) => `rgb(${theme.sideBar.tagIcon})`};
    margin-right: ${({open}) => (open ? '14px' : '0')};
    transition: transform 0.25s ease, -webkit-transform 0.25s ease;
    transition: -webkit-transform 0.25s ease;
    transition: transform 0.25s ease;
  }
  .tag-wrapper {
    display: flex;
    height: 48px;
    width: 100%;
    border-radius: 4px;
    padding: ${({open}) => (open ? '10px 9px' : '10px 0')};
    align-items: center;
    background: ${({theme, activetag}: any) =>
      activetag
        ? `rgba(${theme.sideBar.activeDropDown}, 0.9)`
        : `rgb(${theme.sideBar.background})`};
    justify-content: ${({open}) => (open ? 'flex-start' : 'center')};
    position: relative;
  }
`
