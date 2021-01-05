import {DarkHorizontalTheme, DarkVerticalTheme} from './darkTheme'
import {HorizontalDashBoard, VerticalDashBoard} from './index'
import {LightHorizontalTheme, LightVerticalTheme} from './lightTheme'
import {SemiDarkHorizontalTheme, SemiDarkVerticalTheme} from './semiDarkTheme'

const horizontalRedTheme = {
  type: 'red',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '243, 243, 243',
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
const verticalRedTheme = {
  type: 'red',
  primary: '0, 107, 166',
  secondary: '13, 59, 102',
  background: '243, 243, 243',
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
  sideBar: {
    background: '255, 255, 255',
    tagTittle: '153, 153, 153',
    tagName: '98, 98, 98',
    tagIcon: '86, 86, 86',
    activeDropDown: '255, 255, 255',
  },
  footer: {
    background: '0, 107, 166',
    text: '255, 255, 255',
  },
}
export const getTheme = (orientation: string, theme: string) => {
  switch (theme) {
    case 'light':
      if (orientation === 'horizontal') return LightHorizontalTheme
      return LightVerticalTheme
    case 'dark':
      if (orientation === 'horizontal') return DarkHorizontalTheme
      return DarkVerticalTheme
    case 'semidark':
      if (orientation === 'horizontal') return SemiDarkHorizontalTheme
      return SemiDarkVerticalTheme
    case 'red':
      if (orientation === 'horizontal') return horizontalRedTheme
      return verticalRedTheme
    default:
      if (orientation === 'horizontal') return LightHorizontalTheme
      localStorage.setItem('theme-type', JSON.stringify('light'))
      return LightVerticalTheme
  }
}
