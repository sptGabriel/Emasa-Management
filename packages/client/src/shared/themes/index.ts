interface Vertical {
  header: {
    color: string
    svg: string
    hoverSvg: string
    text: string
  }
  dropTag: string
  text: string
  textActive: string
  subText: string
  subTextActive: string
  widget: string
  widgetActive: string
}
export type ITheme = {
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
  sideBar?: {
    background: string;
    tagTittle: string;
    tagName: string;
    tagIcon: string;
    activeDropDown: string;
  }
  header: {
    userName: string
    userPosition: string
    tools: string
    toolsHover: string
  }
}