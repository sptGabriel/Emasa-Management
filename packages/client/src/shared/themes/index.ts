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
type navBar = {
  widget: string
  searchBox: string
  searchSvg: string
  searchText: string
  hamburguer: string
}
export type ITheme = {
  type: string
  primary: string
  secondary: string
  background: string
  backgroundSecondary: string
  sideBar: sideBar
  navBar: navBar
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
  },
  navBar: {
    widget: '#10387e',
    searchBox: 'rgba(0,0,0,0.05)',
    searchSvg: 'rgba(0,0,0,0.06)',
    searchText: '#455560',
    hamburguer: '#10387e'
  }
}

export const darkTheme: ITheme = {
  type: 'dark',
  primary: '#fff',
  secondary: 'rgb(168, 168, 179)',
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
  },
  navBar: {
    widget: 'rgb(168, 168, 179)',
    searchBox: 'rgb(20, 19, 22)',
    searchSvg: 'rgb(168, 168, 179, 0.15)',
    searchText: '#fff',
    hamburguer: 'rgb(168, 168, 179)'
  }
}
