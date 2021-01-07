export const horizontalPinkTheme = (type: string) => {
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
      logo: '255, 255, 255',
      background: '255, 64, 0',
      tools: '255, 255, 255',
      toolsHover: '0, 108, 166',
    },
    navBar: {
      background: '0, 0, 0',
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
export const verticalPinkTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '87, 10, 252' : '119, 0, 255',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '243, 243, 243' : '66, 1, 56',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: type === 'light' ? '161, 0, 255' : '128, 34, 113',
        text: '255, 255, 255',
        activeBg: type === 'light' ? '87, 10, 252' : '119, 0, 255',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: '255, 64, 0',
      background: type === 'light' ? '161, 0, 255' : '128, 34, 113',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '161, 0, 255' : '128, 34, 113',
      tagTittle: '247, 190, 171',
      tagName: '255, 255, 255',
      tagIcon: '255, 255, 255',
      activeDropDown: type === 'light' ? '120, 2, 245' : '66, 1, 56',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
