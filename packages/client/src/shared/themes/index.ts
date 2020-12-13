/* eslint-disable prettier/prettier */
type colors = {
  primary: string
  secondary: string
  background: string
  text: string
}
type sideBar = {
  tittleTag: string
  menuTag: {
    background: string
    hoveredBackground: string
    text: string
    activeText: string
  }
  scrollBar: string
}
export type ITheme = {
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
  sideBar: sideBar
}

export const lightTheme: ITheme = {
  type: 'light',
  primary: '#10387e',
  secondary: '#3e82f7',
  background: '#FFF',
  backgroundSecondary: '#FAFAFB',
  sideBar: {
    tittleTag: 'rgba(26, 51, 83, 0.6)',
    menuTag: {
      background: 'rgb(202, 240, 248, 0.4)',
      hoveredBackground: 'rgb(202, 240, 248,  0.2)',
      text: '#2c323f',
      activeText: '#10387e'
    },
    scrollBar: '#bde0fe'
  }
}

export const darkTheme: ITheme = {
  type: 'dark',
  primary: 'rgb(202, 240, 248, 0.4)',
  secondary: '#3e82f7',
  background: '#202024',
  backgroundSecondary: '#121214',
  sideBar: {
    tittleTag: '#fff',
    menuTag: {
      background: 'rgb(20, 19, 22);',
      hoveredBackground: 'rgb(20, 19, 22)',
      text: 'rgb(168, 168, 179)',
      activeText: '#fff'
    },
    scrollBar: '#7d7f90'
  }
}
