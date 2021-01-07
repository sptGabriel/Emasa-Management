export const horizontalPurpleTheme = (type: string) => {
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
export const verticalPurpleTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '131, 16, 196' : '136, 6, 204',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '243, 243, 243' : '27, 0, 41',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: type === 'light' ? '107, 11, 163' : '46, 1, 71',
        text: '255, 255, 255',
        activeBg: type === 'light' ? '131, 16, 196' : '136, 6, 204',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: type === 'light' ? '116, 12, 176' : '27, 0, 41',
      background: type === 'light' ? '107, 11, 163' : '46, 1, 71',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '107, 11, 163' : '46, 1, 71',
      tagTittle: '247, 190, 171',
      tagName: '255, 255, 255',
      tagIcon: '255, 255, 255',
      activeDropDown: type === 'light' ? '67, 10, 99' : '27, 0, 41',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
