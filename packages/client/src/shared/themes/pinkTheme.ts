export const horizontalPinkTheme = (type: string) => {
  return {
    type,
    primary:
      type === 'light' || type === 'semidark' ? '161, 0, 255' : '99, 2, 99',
    secondary: '13, 59, 102',
    background: (() => {
      if (type === 'dark') return '43, 0, 43'
      if (type === 'semidark') return '56, 1, 56'
      return '255, 255, 255'
    })(),
    backgroundSecondary:
      type === 'light' || type === 'semidark' ? '128, 3, 128' : '99, 2, 99',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: (() => {
          if (type === 'dark') return '99, 2, 99'
          if (type === 'semidark') return '128, 3, 128'
          return '255, 255, 255'
        })(),
        text: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        activeBg: '161, 0, 255',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      background: '40, 199, 12',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    navBar: {
      background: '161, 0, 255',
      text: '255, 255, 255',
      svg: '255, 255, 255',
      activeBgButton: (() => {
        if (type === 'dark') return '92, 22, 81'
        return '128, 34, 113'
      })(),
      dropdownBg: (() => {
        if (type === 'dark') return '99, 2, 99'
        if (type === 'semidark') return '128, 3, 128'
        return '255, 255, 255'
      })(),
      dropdownTxt: type === 'light' ? '63, 66, 84' : '255, 255, 255',
      dropdownBgOptActive: (() => {
        if (type === 'dark') return '82, 2, 82'
        if (type === 'semidark') return '94, 2, 94'
        return '161, 0, 255'
      })(),
      dropdownTextOptActive: '255, 255, 255',
    },
    footer: {
      background: (() => {
        if (type === 'dark') return '99, 2, 99'
        if (type === 'semidark') return '161, 0, 255'
        return '255, 255, 255'
      })(),
      text: '255, 255, 255',
    },
  }
}
export const verticalPinkTheme = (type: string) => {
  return {
    type,
    primary: type === 'light' ? '87, 10, 252' : '150, 2, 126',
    secondary: '13, 59, 102',
    background:
      type === 'light' || type === 'semidark' ? '244, 245, 248' : '36, 0, 30',
    backgroundSecondary: '13, 59, 102',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: '255, 255, 255',
        text: '98, 95, 110',
        activeBg: '161, 0, 255',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      searchBg: type === 'light' ? '134, 6, 209' : '105, 4, 91',
      background: type === 'light' ? '161, 0, 255' : '107, 28, 94',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    sideBar: {
      background: type === 'light' ? '161, 0, 255' : '107, 28, 94',
      tagTittle: '247, 190, 171',
      tagName: '255, 255, 255',
      tagIcon: '255, 255, 255',
      activeDropDown: type === 'light' ? '120, 2, 245' : '66, 1, 56',
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
