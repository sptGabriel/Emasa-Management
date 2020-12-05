import { makeAutoObservable } from 'mobx'
import { RootStore } from './rootStore'

export class ThemeStore {
  isDarkMode = false

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  public toggleDarkMode = () => {
    this.isDarkMode = !this.isDarkMode
  }
}