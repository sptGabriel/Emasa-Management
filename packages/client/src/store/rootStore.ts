import { makeAutoObservable } from 'mobx'
import { AuthStore } from './authStore'
import { AxiosStore } from './axiosStore'
import { CookieStore } from './cookieStore'
import { CurrentUserStore } from './currentUserStore'
import { LayoutUIStore } from './layoutUiStore'
import { ThemeStore } from './themeStore'

export class RootStore {
  appName = 'Emasa'

  appLoaded = false

  currentUserStore: CurrentUserStore

  authStore: AuthStore

  cookieStore: CookieStore

  themeStore: ThemeStore

  AxiosStore: AxiosStore

  layoutStore: LayoutUIStore

  constructor() {
    makeAutoObservable(this)
    this.AxiosStore = new AxiosStore(this)
    this.AxiosStore.enableInterceptors()
    this.themeStore = new ThemeStore(this)
    this.cookieStore = new CookieStore(this)
    this.currentUserStore = new CurrentUserStore(this)
    this.authStore = new AuthStore(this)
    this.layoutStore = new LayoutUIStore(this)
  }

  public setAppLoaded = (): void => {
    this.appLoaded = true
  }
}
