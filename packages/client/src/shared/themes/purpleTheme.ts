export const horizontalPurpleTheme = (type: string) => {
  return {
    type,
    primary:
      type === 'light' || type === 'semidark' ? '117, 11, 163' : '59, 5, 89',
    secondary: '13, 59, 102',
    background: (() => {
      if (type === 'dark') return '28, 0, 43'
      if (type === 'semidark') return '42, 1, 66'
      return '255, 255, 255'
    })(),
    backgroundSecondary:
      type === 'light' || type === 'semidark' ? '77, 8, 117' : '59, 5, 89',
    header: {
      userSection: {
        userName: '255, 255, 255',
        userPosition: '255, 255, 255',
        bg: (() => {
          if (type === 'dark') return '59, 5, 89'
          if (type === 'semidark') return '77, 8, 117'
          return '255, 255, 255'
        })(),
        text: type === 'light' ? '98, 95, 110' : '255, 255, 255',
        activeBg: '117, 11, 163',
        activeText: '255, 255, 255',
      },
      logo: '255, 255, 255',
      background: '40, 199, 12',
      tools: '255, 255, 255',
      toolsHover: '255, 255, 255',
    },
    navBar: {
      background: '107, 11, 163',
      text: '255, 255, 255',
      svg: '255, 255, 255',
      activeBgButton: (() => {
        if (type === 'dark') return '59, 5, 89'
        return '77, 8, 117'
      })(),
      dropdownBg: (() => {
        if (type === 'dark') return '59, 5, 89'
        if (type === 'semidark') return '77, 8, 117'
        return '255, 255, 255'
      })(),
      dropdownTxt: type === 'light' ? '63, 66, 84' : '255, 255, 255',
      dropdownBgOptActive: (() => {
        if (type === 'dark') return '69, 6, 105'
        if (type === 'semidark') return '96, 12, 145'
        return '117, 11, 163'
      })(),
      dropdownTextOptActive: '255, 255, 255',
    },
    footer: {
      background: (() => {
        if (type === 'dark') return '59, 5, 89'
        if (type === 'semidark') return '77, 8, 117'
        return '255, 255, 255'
      })(),
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
