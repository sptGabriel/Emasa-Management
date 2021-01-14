import {makeAutoObservable} from 'mobx'
import {HorizontalDashBoard, VerticalDashBoard} from '../shared/themes'
import {getCustomTheme} from '../shared/themes/customThemes'
import {getTheme} from '../shared/themes/getTheme'
import {isColor} from '../shared/utils/isColor'
import {isJson} from '../shared/utils/isJson'
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

  theme!: VerticalDashBoard | HorizontalDashBoard

  isLayoutHorizontal = false

  layoutType: LayoutType = LayoutType.vertical

  overlay = false

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.initLayoutOrientation()
    this.initTheme()
  }

  toggleOverlay = () => {
    this.overlay = !this.overlay
  }

  initLayoutOrientation = () => {
    const orientation: any = localStorage.getItem('layout-type')
    switch (JSON.parse(orientation)) {
      case 'vertical':
        this.layoutType = LayoutType.vertical
        break
      case 'horizontal':
        this.layoutType = LayoutType.horizontal
        break
      default:
        localStorage.setItem('layout-type', JSON.stringify('vertical'))
        this.layoutType = LayoutType.vertical
        break
    }
  }

  initTheme = () => {
    const [err1, theme]: any = isJson(localStorage.getItem('theme-type'))
    const [err2, customTheme]: any = isJson(localStorage.getItem('t-col'))
    this.theme = getTheme(this.layoutType, err1 ? undefined : theme)
    if (!isColor(customTheme)) return localStorage.removeItem('t-col')
    this.theme = getCustomTheme(
      this.layoutType,
      err2 ? undefined : customTheme,
      this.theme.type,
    )
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

  changeLayoutOrientation = (value: string) => {
    switch (value) {
      case 'vertical':
        localStorage.setItem('layout-type', JSON.stringify('vertical'))
        this.layoutType = LayoutType.vertical
        this.initTheme()
        break
      case 'horizontal':
        localStorage.setItem('layout-type', JSON.stringify('horizontal'))
        this.layoutType = LayoutType.horizontal
        this.initTheme()
        break
      default:
        localStorage.setItem('layout-type', JSON.stringify('vertical'))
        this.layoutType = LayoutType.vertical
        this.initTheme()
        break
    }
  }

  setTheme = (theme: string) => {
    localStorage.setItem('theme-type', JSON.stringify(theme))
    return this.initTheme()
  }

  setCustomTheme = (color: string) => {
    localStorage.setItem('t-col', JSON.stringify(color))
    return this.initTheme()
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
