import {HorizontalDashBoard, VerticalDashBoard} from './index'

export const DefaultNav: {
  horizontal: HorizontalDashBoard
  vertical: VerticalDashBoard
} = {
  vertical: {
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
  },
  horizontal: {
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
}

export const Red: {
  horizontal: HorizontalDashBoard
  vertical: VerticalDashBoard
} = {
  vertical: {
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
  },
  horizontal: {
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
}

export const getNavBarTheme = (color: string) => {
  if (color === '234, 84, 85') return Red
  return undefined
}
