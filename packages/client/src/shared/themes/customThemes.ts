import {LightHorizontalTheme, LightVerticalTheme} from './lightTheme'

const horizontalRedTheme = (type: string) => {
  return {
    type,
    primary: '255, 64, 0',
    secondary: '13, 59, 102',
    background: '243, 243, 243',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: '255, 64, 0',
        text: '153, 153, 153',
        activeBg: '0, 107, 166',
        activeText: '255, 255, 255',
      },
      background: '255, 64, 0',
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
}
const verticalRedTheme = (type: string) => {
  return {
    type,
    primary: '255, 64, 0',
    secondary: '13, 59, 102',
    background: '243, 243, 243',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: '255, 64, 0',
        text: '153, 153, 153',
        activeBg: '0, 107, 166',
        activeText: '255, 255, 255',
      },
      searchBg: '255, 64, 0',
      background: '255, 64, 0',
      tools: '255, 255, 255',
      toolsHover: '0, 108, 166',
    },
    sideBar: {
      background: '255, 64, 0',
      tagTittle: '153, 153, 153',
      tagName: '98, 98, 98',
      tagIcon: '86, 86, 86',
      activeDropDown: '255, 255, 255',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
export const getCustomTheme = (
  orientation: string,
  color: string,
  type: string,
) => {
  switch (color) {
    case '#ff4000':
      if (orientation === 'horizontal') return horizontalRedTheme(type)
      return verticalRedTheme(type)
    default:
      localStorage.removeItem('t-col')
      if (orientation === 'horizontal') return LightHorizontalTheme
      return LightVerticalTheme
  }
}
