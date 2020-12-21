import {makeAutoObservable} from 'mobx'
import {RootStore} from './rootStore'

export class LayoutUIStore {
  sideBar = true

  isDarkMode: boolean

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    const storageTheme = localStorage.getItem('theme')
    this.isDarkMode =
      (storageTheme && JSON.parse(storageTheme) === 'dark') || false
  }

  toggleSideBar = () => {
    this.sideBar = !this.sideBar
  }

  toggleDarkMode = () => {
    localStorage.setItem(
      'theme',
      JSON.stringify(this.isDarkMode ? 'light ' : 'dark'),
    )
    this.isDarkMode = !this.isDarkMode
  }
}
