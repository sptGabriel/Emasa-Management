import {string} from 'prop-types'
import {HorizontalDashBoard, VerticalDashBoard} from '.'

export const horizontalLightTheme: HorizontalDashBoard = {
  type: 'light',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '255, 255, 255',
  backgroundSecondary: '13, 59, 102',
  header: {
    userSection: {
      userName: '255, 255, 255',
      userPosition: '255, 255, 255',
      bg: '255, 255, 255',
      text: '153, 153, 153',
      activeBg: '0, 107, 166',
      activeText: '255, 255, 255',
    },
    logo: '255, 255, 255',
    background: '0, 108, 166',
    tools: '255, 255, 255',
    toolsHover: '0, 108, 166',
  },
  navBar: {
    background: '0, 107, 166',
    text: '255, 255, 255',
    svg: '255, 255, 255',
    activeBgButton: '13, 59, 102',
    dropdownBg: '255, 255, 255',
    dropdownTxt: '63, 66, 84',
    dropdownBgOptActive: '243, 246, 249',
    dropdownTextOptActive: '105, 147, 255',
  },
  footer: {
    background: '255, 255, 255',
    text: '255, 255, 255',
  },
}
export const verticalLightTheme: VerticalDashBoard = {
  type: 'light',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '243, 243, 243',
  backgroundSecondary: '243, 243, 243',
  header: {
    userSection: {
      userName: '110, 107, 123',
      userPosition: '110, 107, 123',
      bg: '255, 255, 255',
      text: '110, 107, 123',
      activeBg: '0, 107, 166',
      activeText: '255, 255, 255',
    },
    logo: '0, 107, 166',
    searchBg: '243, 243, 243',
    background: '255, 255, 255',
    tools: '110, 107, 123',
    toolsHover: '0, 108, 166',
  },
  sideBar: {
    background: '255, 255, 255',
    tagTittle: '153, 153, 153',
    tagName: '98, 98, 98',
    tagIcon: '86, 86, 86',
    activeDropDown: '243, 243, 243',
    scrollBar: '243, 243, 243',
  },
  footer: {
    background: '0, 107, 166',
    text: '110, 107, 123',
  },
}
