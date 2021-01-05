export interface VerticalDashBoard {
  sideBar: {
    background: string
    tagTittle: string
    tagName: string
    tagIcon: string
    activeDropDown: string
  }
  header: {
    userSection: {
      userName: string
      userPosition: string
      bg: string
      text: string
      activeBg: string
      activeText: string
    }
    background: string
    tools: string
    toolsHover: string
  }
  footer: {
    background: string
    text: string
  }
}
export interface HorizontalDashBoard {
  header: {
    userSection: {
      userName: string
      userPosition: string
      bg: string
      text: string
      activeBg: string
      activeText: string
    }
    background: string
    tools: string
    toolsHover: string
  }
  navBar: {
    text: string
    svg: string
    activeBgButton: string
    dropdownBg: string
    dropdownTxt: string
    dropdownBgOptActive: string
    dropdownTextOptActive: string
  }
  footer: {
    background: string
    text: string
  }
}
export type ITheme = {
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
  vertical: VerticalDashBoard
  horizontal: HorizontalDashBoard
}
