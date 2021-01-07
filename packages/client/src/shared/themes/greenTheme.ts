export const horizontalGreenTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '40, 199, 112' : '255, 64, 0',
    secondary: '13, 59, 102',
    background: type === 'light' ? '255, 255, 255' : '8, 38, 0',
    backgroundSecondary:
      type === 'light' || type === 'semidark' ? '23, 99, 5' : '31, 79, 22',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: type === 'light' || type === 'semidark' ? '31, 79, 22' : '74, 2, 1',
        text: '255, 255, 255',
        activeBg: type === 'light' ? '255, 64, 0' : '255, 64, 0',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      background: type === 'light' ? '255, 64, 0' : '120, 1, 1',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    navBar: {
      background: '40, 199, 112',
      text: '255, 255, 255',
      svg: '255, 255, 255',
      activeBgButton: (() => {
        if (type === 'dark') return '31, 79, 22'
        return '23,99,5'
      })(),
      dropdownBg: (() => {
        if (type === 'dark') return '31, 79, 22'
        if (type === 'semidark') return '23,99,5'
        return '255, 255, 255'
      })(),
      dropdownTxt: type === 'light' ? '63, 66, 84' : '255, 255, 255',
      dropdownBgOptActive: (() => {
        if (type === 'dark') return '92, 3, 2'
        if (type === 'semidark') return '133, 3, 3'
        return '218, 255, 209'
      })(),
      dropdownTextOptActive: (() => {
        if (type === 'dark') return '92, 3, 2'
        if (type === 'semidark') return '133, 3, 3'
        return '63, 66, 84'
      })(),
    },
    footer: {
      background: (() => {
        if (type === 'dark') return '74, 2, 1'
        if (type === 'semidark') return '255,64,0'
        return '255, 255, 255'
      })(),
      text: '255, 255, 255',
    },
  }
}
export const verticalGreenTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '44, 110, 5' : '40, 199, 112',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '243, 243, 243' : '0, 54, 27',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        userPosition: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        bg: type === 'light' ? '40, 199, 112' : '31, 79, 22',
        text: '255, 255, 255',
        activeBg: type === 'light' ? '44, 110, 5' : '40, 199, 112',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: '255, 64, 0',
      background: type === 'light' ? '40, 199, 112' : '31, 79, 22',
      tools: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      toolsHover: type === 'light' ? '98, 95, 110' : '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '40, 199, 112' : '31, 79, 22',
      tagTittle: '166, 164, 176',
      tagName: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      tagIcon: type === 'light' ? '98, 95, 110' : '255, 255, 255',
      activeDropDown: type === 'light' ? '199, 235, 212' : '93, 112, 103',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
