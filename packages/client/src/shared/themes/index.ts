export interface VerticalDashBoard {
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
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
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
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