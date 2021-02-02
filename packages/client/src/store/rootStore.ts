import Bowser from 'bowser'
import {makeAutoObservable, runInAction} from 'mobx'
import {getPosition} from '../shared/utils/getPosition'
import {AuthStore} from './authStore'
import {AxiosStore} from './axiosStore'
import {CookieStore} from './cookieStore'
import {CurrentUserStore} from './currentUserStore'
import {DepartamentStore} from './departamentStore'
import {LayoutUIStore} from './layoutUiStore'

export class RootStore {
  appName = 'Emasa'

  appState = 'pending'

  departamentStore: DepartamentStore

  currentUserStore: CurrentUserStore

  authStore: AuthStore

  cookieStore: CookieStore

  AxiosStore: AxiosStore

  layoutStore: LayoutUIStore

  accessToken: string | null = null

  timezone = new Date().getTimezoneOffset() / 60

  browser = Bowser.parse(window.navigator.userAgent).browser.name

  os = Bowser.parse(window.navigator.userAgent).os.name

  constructor() {
    makeAutoObservable(this)
    this.AxiosStore = new AxiosStore(this)
    this.layoutStore = new LayoutUIStore(this)
    this.AxiosStore.enableInterceptors()
    this.cookieStore = new CookieStore(this)
    this.currentUserStore = new CurrentUserStore(this)
    this.authStore = new AuthStore(this)
    this.departamentStore = new DepartamentStore(this)
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

  public getPosition = async (options?: any) => {
    const position: any = await getPosition(options)
    if (!(position instanceof GeolocationPosition))
      return {latitude: null, longitude: null}
    const {latitude, longitude} = position.coords
    return {latitude, longitude}
  }
}
