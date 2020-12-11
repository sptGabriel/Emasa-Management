import { makeAutoObservable } from 'mobx'
import { ITheme, darkTheme, lightTheme } from '../shared/themes'
import { RootStore } from './rootStore'

export class ThemeStore {
  isDarkMode = false
  theme:ITheme | undefined

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    this.initTheme()
  }
  public setTheme = (theme:ITheme) => {
    localStorage.setItem('theme', JSON.stringify(theme.type))
    this.theme = theme;
  }
  public initTheme = () => {
    const jsonTheme = localStorage.getItem('theme')
    if(!jsonTheme) return this.setTheme(lightTheme)
    return this.setTheme(JSON.parse(jsonTheme) === 'dark' ? darkTheme : lightTheme)
  }
  public toggleDarkMode = () => {
    this.isDarkMode = !this.isDarkMode
  }
}
