import jwtDecode from 'jwt-decode'
import {action, makeAutoObservable, runInAction} from 'mobx'
import {UserModel} from '../models/userModel'
import {AuthStore} from './authStore'
import {AxiosStore} from './axiosStore'
import {CookieStore} from './cookieStore'
import {CurrentUserStore} from './currentUserStore'
import {LayoutUIStore} from './layoutUiStore'

export class RootStore {
  appName = 'Emasa'

  appState = 'pending'

  currentUserStore: CurrentUserStore

  authStore: AuthStore

  cookieStore: CookieStore

  AxiosStore: AxiosStore

  layoutStore: LayoutUIStore

  accessToken: string | null = null

  constructor() {
    makeAutoObservable(this)
    this.AxiosStore = new AxiosStore(this)
    this.layoutStore = new LayoutUIStore(this)
    this.AxiosStore.enableInterceptors()
    this.cookieStore = new CookieStore(this)
    this.currentUserStore = new CurrentUserStore(this)
    this.authStore = new AuthStore(this)
  }

  public initApi = async (): Promise<void> => {
    this.appState = 'pending'
    try {
      const response = await this.AxiosStore.get('/')
      runInAction(async () => {
        if (!response.data.token) {
          this.authStore.isAuth = false
          this.appState = 'done'
          return
        }
        this.currentUserStore.accessToken = response.data.token
        await this.currentUserStore.pullUser().then(() => {
          this.authStore.isAuth = true
        })
        this.appState = 'done'
      })
    } catch (e) {
      runInAction(() => {
        this.appState = 'error'
        this.authStore.logout()
      })
    }
  }
}
