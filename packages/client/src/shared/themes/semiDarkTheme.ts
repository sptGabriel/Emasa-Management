import {HorizontalDashBoard, VerticalDashBoard} from '.'

export const SemiDarkHorizontalTheme: HorizontalDashBoard = {
  type: 'semidark',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '22, 29, 49',
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
    background: '0, 108, 166',
    tools: '255, 255, 255',
    toolsHover: '0, 108, 166',
  },
  navBar: {
    text: '255, 255, 255',
    svg: '255, 255, 255',
    activeBgButton: '13, 59, 102',
    dropdownBg: '255, 255, 255',
    dropdownTxt: '63, 66, 84',
    dropdownBgOptActive: '243, 246, 249',
    dropdownTextOptActive: '105, 147, 255',
  },
  footer: {
    background: '0, 107, 166',
    text: '255, 255, 255',
  },
}
export const SemiDarkVerticalTheme: VerticalDashBoard = {
  type: 'semidark',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '243, 243, 243',
  backgroundSecondary: '255 , 255, 255',
  sideBar: {
    background: '40, 48, 70',
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
      bg: '40, 48, 70',
      text: '255, 255, 255',
      activeBg: '0, 107, 166',
      activeText: '255, 255, 255',
    },
    searchBg: '22, 29, 49',
    background: '40, 48, 70',
    tools: '208, 210, 214',
    toolsHover: '0, 108, 166',
  },
  footer: {
    background: '40, 48, 70',
    text: '110, 107, 123',
  },
}
