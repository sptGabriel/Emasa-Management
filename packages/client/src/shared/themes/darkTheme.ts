import {HorizontalDashBoard, VerticalDashBoard} from '.'

export const horizontalDarkTheme: HorizontalDashBoard = {
  type: 'dark',
  primary: '40, 48, 70',
  secondary: '13, 59, 102',
  background: '1, 8, 31',
  backgroundSecondary: '40, 48, 70',
  header: {
    userSection: {
      userName: '255, 255, 255',
      userPosition: '255, 255, 255',
      bg: '40, 48, 70',
      text: '255, 255, 255',
      activeBg: '0, 107, 166',
      activeText: '255, 255, 255',
    },
    logo: '255, 255, 255',
    background: '40, 48, 70',
    tools: '255, 255, 255',
    toolsHover: '255, 255, 255',
  },
  navBar: {
    background: '0, 107, 166',
    text: '255, 255, 255',
    svg: '255, 255, 255',
    activeBgButton: '22, 29, 49',
    dropdownBg: '40, 48, 70',
    dropdownTxt: '208, 210, 214',
    dropdownBgOptActive: '22, 29, 49',
    dropdownTextOptActive: '105, 147, 255',
  },
  footer: {
    background: '40, 48, 70',
    text: '208, 210, 214',
  },
}
export const verticalDarkTheme: VerticalDashBoard = {
  type: 'dark',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '13, 18, 31',
  backgroundSecondary: '40, 48, 70',
  sideBar: {
    background: '0, 49, 89',
    tagTittle: '103, 109, 125',
    tagName: '208, 210, 214',
    tagIcon: '208, 210, 214',
    activeDropDown: '22, 29, 49',
    scrollBar: '243, 243, 243',
  },
  header: {
    userSection: {
      userName: '208, 210, 214',
      userPosition: '208, 210, 214',
      bg: '255, 255, 255',
      text: '98, 95, 110',
      activeBg: '0, 107, 166',
      activeText: '255, 255, 255',
    },
    logo: '255, 255, 255',
    searchBg: '22, 29, 49',
    background: '0, 49, 89',
    tools: '208, 210, 214',
    toolsHover: '0, 108, 166',
  },
  footer: {
    background: '40, 48, 70',
    text: '208, 210, 214',
  },
}
