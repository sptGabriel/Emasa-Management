export const horizontalYellowTheme = (type: string) => {
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
export const verticalYellowTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '227, 206, 18' : '227, 206, 18',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '243, 243, 243' : '48, 44, 0',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        userPosition: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        bg: type === 'light' ? '234, 255, 0' : '196, 177, 4',
        text: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        activeBg: type === 'light' ? '227, 206, 18' : '227, 206, 18',
        activeText: '255, 255, 255',
      },
      logo: '0, 107, 166',
      searchBg: type === 'light' ? '194, 212, 2' : '145, 131, 1',
      background: type === 'light' ? '234, 255, 0' : '196, 177, 4',
      tools: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      toolsHover: type === 'light' ? '98, 95, 110' : '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '234, 255, 0' : '196, 177, 4',
      tagTittle: '166, 164, 176',
      tagName: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      tagIcon: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      activeDropDown: type === 'light' ? '225, 232, 155' : '48, 44, 0',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
