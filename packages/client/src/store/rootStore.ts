import { makeAutoObservable } from 'mobx'
import { AuthStore } from './authStore'
import { CookieStore } from './cookieStore'
import { CurrentUserStore } from './currentUserStore'

export class RootStore {
  appName = 'Emasa'

  appLoaded = false

  currentUserStore: CurrentUserStore

  authStore: AuthStore

  cookieStore: CookieStore

  constructor() {
    makeAutoObservable(this)
    this.cookieStore = new CookieStore(this)
    this.currentUserStore = new CurrentUserStore(this)
    this.authStore = new AuthStore(this)
  }

  setAppLoaded(): void {
    this.appLoaded = true
  }
}
