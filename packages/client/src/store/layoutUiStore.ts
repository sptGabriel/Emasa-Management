import {makeAutoObservable} from 'mobx'
import {ITheme} from '../shared/themes'
import {DarkTheme} from '../shared/themes/darkTheme'
import {HorizontalLightTheme, LightTheme} from '../shared/themes/lightTheme'
import {getNavBarTheme} from '../shared/themes/navBarThemes'
import {SemiDarkTheme} from '../shared/themes/semiDarkTheme'
import {ensure} from '../shared/utils/ensure'
import {isColor} from '../shared/utils/isColor'
import {RootStore} from './rootStore'

enum LayoutType {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

export class LayoutUIStore {
  sideBar = true

  onHoverSideState = false

  themeSideBar = false

  //  isDarkMode: boolean

  theme!: ITheme

  isLayoutHorizontal = false

  layoutType: LayoutType = LayoutType.horizontal

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.initTheme()
  }

  initTheme = () => {
    const theme: any = JSON.parse(ensure(localStorage.getItem('theme-type')))
    const headerColor: any = JSON.parse(ensure(localStorage.getItem('h-col')))
    const primaryColor: any = JSON.parse(ensure(localStorage.getItem('p-col')))
    const getTheme = () => {
      switch (theme) {
        case 'light':
          if (this.layoutType === 'horizontal') return HorizontalLightTheme
          return LightTheme
        case 'dark':
          return DarkTheme
        case 'semidark':
          return SemiDarkTheme
        default:
          if (this.layoutType === 'horizontal') return HorizontalLightTheme
          return LightTheme
      }
    }
    this.theme = getTheme()
    this.theme.header = headerColor
      ? getNavBarTheme(JSON.parse(headerColor))
      : this.theme.header
    this.theme.primary = isColor(primaryColor)
      ? primaryColor
      : this.theme.primary
    //  this.theme.map((theme) => {
    //  if (theme.type !== JSON.parse(themeType)) theme.status = false
    //  if (theme.type === JSON.parse(themeType)) {
    //    theme.status = true
    //    theme.primary = isColor(JSON.parse(primaryColor))
    //      ? primaryColor
    //      : theme.primary
    //    theme.header = getNavBarTheme(JSON.parse(headerColor))
    //  }
    //  return theme
    //  })
    //  const getTheme = () => {
    //  switch (themeType && JSON.parse(themeType)) {
    //    case 'light':
    //      return LightTheme
    //    case 'dark':
    //      return DarkTheme
    //    case 'semidark':
    //      return SemiDarkTheme
    //    default:
    //      return LightTheme
    //  }
    //  }
    //  if (headerColor) theme.header = headerColor
    //  if (primaryColor) theme.primary = primaryColor
    //  this.theme = theme
  }

  setDarkTheme = () => {
    localStorage.setItem(
      'theme-type',
      JSON.stringify(this.theme.type === 'dark' ? 'light' : 'dark'),
    )
    this.initTheme()
  }

  setColorTheme = (color: string) => {
    localStorage.setItem('p-col', JSON.stringify(color))
    this.initTheme()
  }

  setColorHeader = (color: string) => {
    localStorage.setItem('h-col', JSON.stringify(color))
    this.initTheme()
  }

  toggleSideBar = () => {
    this.sideBar = !this.sideBar
  }

  setLayoutHorizontal = () => {
    this.layoutType = LayoutType.horizontal
  }

  setLayoutVertical = () => {
    this.layoutType = LayoutType.vertical
  }

  toggleThemeSideBar = () => {
    this.themeSideBar = !this.themeSideBar
  }

  //  toggleDarkMode = () => {
  //  localStorage.setItem(
  //    'theme',
  //    JSON.stringify(this.isDarkMode ? 'light ' : 'dark'),
  //  )
  //  this.isDarkMode = !this.isDarkMode
  //  }
}
