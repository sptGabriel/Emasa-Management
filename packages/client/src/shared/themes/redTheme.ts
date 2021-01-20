export const horizontalRedTheme = (type: string) => {
  return {
    type,
    primary:
      type === 'light' || type === 'semidark' ? '255, 64, 0' : '74, 2, 1',
    secondary: '13, 59, 102',
    background: (() => {
      if (type === 'dark') return '28, 1, 1'
      if (type === 'semidark') return '41, 1, 0'
      return '255, 255, 255'
    })(),
    backgroundSecondary:
      type === 'light' || type === 'semidark' ? '120, 1, 1' : '74, 2, 1',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: (() => {
          if (type === 'dark') return '74, 2, 1'
          if (type === 'semidark') return '120, 1, 1'
          return '255, 255, 255'
        })(),
        text: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        activeBg: type === 'light' ? '255, 64, 0' : '255, 64, 0',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      background: (() => {
        if (type === 'dark') return '120, 1, 1'
        if (type === 'semidark') return '120, 1, 1'
        return '255, 64, 0'
      })(),
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
    primary: type === 'light' ? '252, 97, 86' : '148, 25, 16',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '244, 245, 248' : '31, 0, 0',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: '255, 255, 255',
        text: '98, 95, 110',
        activeBg: '252, 97, 86',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: type === 'light' ? '250, 127, 115' : '138, 15, 3',
      background: type === 'light' ? '255, 64, 0' : '84, 7, 1',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '255, 64, 0' : '84, 7, 1',
      tagTittle: '247, 190, 171',
      tagName: '255, 255, 255',
      tagIcon: '255, 255, 255',
      activeDropDown: type === 'light' ? '115, 5, 5' : '84, 29, 29',
      scrollBar: '243, 243, 243',
    },
    footer: {
      background: '0, 107, 166',
      text: (() => {
        if (type === 'dark') return '255,255,255'
        if (type === 'semidark') return '110, 107, 123'
        return '110, 107, 123'
      })(),
    },
  }
}
