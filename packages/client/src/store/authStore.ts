import {action, configure, makeObservable, runInAction} from 'mobx'
import {v4} from 'public-ip'
import {LoginModel} from '../models/loginModel'
import {UserModel} from '../models/userModel'
import {RootStore} from './rootStore'

configure({
  enforceActions: 'never',
})
export class AuthStore {
  isAuth = false

  errors = undefined

  rootStore: RootStore

  loginModel = new LoginModel()

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      login: action,
      logout: action,
      isAuth: true,
      errors: true,
      rootStore: true,
      loginModel: true,
    })
    this.rootStore = rootStore
  }

  public refreshToken = async (): Promise<void> => {
    try {
      await this.rootStore.AxiosStore.get('/users/me/refresh-token').then(
        (res) => {
          this.rootStore.currentUserStore.accessToken = res.data.access_token
          this.rootStore.currentUserStore.pullUser()
        },
      )
      this.isAuth = true
    } catch (error) {
      const mute = error
      runInAction(() => {
        this.isAuth = false
      })
    }
  }

  public login = async (): Promise<void> => {
    return this.rootStore.AxiosStore.post('/login', {
      ...(await this.rootStore.getPosition()),
      ip: await v4(),
      timezone: this.rootStore.timezone,
      device: this.rootStore.browser,
      os: this.rootStore.os,
      login: this.loginModel.login,
      password: this.loginModel.password,
    }).then((response) => {
      this.rootStore.authStore.isAuth = true
      this.rootStore.currentUserStore.accessToken = response.data.token
      return this.rootStore.currentUserStore.pullUser()
    })
  }

  public logout = async (): Promise<void> => {
    return this.rootStore.AxiosStore.get('/users/me/logout').finally(() => {
      this.isAuth = false
      this.rootStore.currentUserStore.currentUser = new UserModel()
      this.rootStore.currentUserStore.accessToken = null
      this.rootStore.cookieStore.removeToken('emsi')
      this.rootStore.cookieStore.removeToken('@Emasa/Refresh-Token')
    })
  }
}
