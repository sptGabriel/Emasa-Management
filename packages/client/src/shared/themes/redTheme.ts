export const horizontalRedTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '255, 64, 0' : '255, 64, 0',
    secondary: '13, 59, 102',
    background: type === 'light' ? '255, 255, 255' : '41, 1, 0',
    backgroundSecondary:
      type === 'light' || type === 'semidark' ? '120, 1, 1' : '74, 2, 1',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: type === 'light' || type === 'semidark' ? '120, 1, 1' : '74, 2, 1',
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
      background: '255, 64, 0',
      text: '255, 255, 255',
      svg: '255, 255, 255',
      activeBgButton: '94, 29, 3',
      dropdownBg: (() => {
        if (type === 'dark') return '74, 2, 1'
        if (type === 'semidark') return '120,1,1'
        return '255, 255, 255'
      })(),
      dropdownTxt: type === 'light' ? '63, 66, 84' : '255, 255, 255',
      dropdownBgOptActive: (() => {
        if (type === 'dark') return '92, 3, 2'
        if (type === 'semidark') return '133, 3, 3'
        return '224, 171, 171'
      })(),
      dropdownTextOptActive: '255, 255, 255',
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
export const verticalRedTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '186, 126, 6' : '179, 98, 0',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '243, 243, 243' : '94, 29, 3',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: '255, 64, 0',
        text: '255, 255, 255',
        activeBg: '186, 126, 6',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: '255, 64, 0',
      background: type === 'light' ? '255, 64, 0' : '120, 1, 1',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '255, 64, 0' : '120, 1, 1',
      tagTittle: '247, 190, 171',
      tagName: '255, 255, 255',
      tagIcon: '255, 255, 255',
      activeDropDown: type === 'light' ? '115, 5, 5' : '84, 29, 29',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: '255, 255, 255',
    },
  }
}
