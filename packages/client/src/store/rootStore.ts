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
      runInAction(() => {
        this.appState = 'done'
        if (!response.data.token) this.authStore.isAuth = false
        if (response.data.token && response.data.user) {
          this.currentUserStore.currentUser = new UserModel(response.data.user)
          this.currentUserStore.accessToken = response.data.token
          this.authStore.isAuth = true
        }
      })
    } catch (e) {
      runInAction(() => {
        this.appState = 'error'
        this.authStore.logout()
      })
    }
    // try {
    //   const response = await this.AxiosStore.get('/')
    //   if (!response) throw Error('Service Unavaliable')
    //   return runInAction(async () => {
    //     if(!response.data.access_token) {
    //       this.authStore.isAuth = false;
    //       this.appState = 'fulfilled'
    //     }
    //     if (response.data.access_token) {
    //       this.currentUserStore.accessToken = response.data.access_token
    //       this.appState = 'fulfilled'
    //     }
    //   })
    // } catch (error) {
    //   runInAction(() => {
    //     this.appState = 'error'
    //   })
    //   return Promise.reject(error)
    // }
  }
}

//  public initApi = (): void => {
//  this.appState = 'pending'
//  this.AxiosStore.get('/').then(
//    action('fetchSuccess', ({data}: any) => {
//      if (data.acess_token)
//        this.currentUserStore.accessToken = data.access_token
//      this.appState = 'fulfilled'
//    }),
//    action('fetchError', (error: Error) => {
//      this.appState = 'error'
//    }),
//  )
//  }

//  this.appState = 'pending'
//  try {
//  const api = await this.AxiosStore.get('/')
//  if (api && !api.data.access_token) {
//    return runInAction(() => {
//      this.appState = 'fulfilled'
//    })
//  }
//  const decoded: any = jwtDecode(api.data.access_token)
//  if (decoded instanceof Error) Promise.reject()
//  return runInAction(() => {
//    this.currentUserStore.accessToken = api.data.access_token
//    this.currentUserStore.currentUser = new UserModel({
//      ...decoded,
//      id: decoded.sub,
//    })
//    this.appState = 'fulfilled'
//    this.authStore.isAuth = true
//  })
//  } catch (error) {
//  runInAction(() => {
//    this.appState = 'error'
//  })
//  return Promise.reject(error)
//  }
//  }
