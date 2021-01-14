import {action, configure, makeObservable, runInAction} from 'mobx'
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
      login: this.loginModel.login,
      password: this.loginModel.password,
    }).then((response) =>
      runInAction(() => {
        console.log(response, 'response')
        this.rootStore.authStore.isAuth = true
        this.rootStore.currentUserStore.accessToken = response.data.token
        this.rootStore.currentUserStore.currentUser = new UserModel(
          response.data.user,
        )
      }),
    )
  }

  public logout = async (): Promise<void> => {
    console.log('on logout')
    return this.rootStore.AxiosStore.get('/users/me/logout').finally(() => {
      this.isAuth = false
      this.rootStore.currentUserStore.currentUser = null
      this.rootStore.currentUserStore.accessToken = null
      this.rootStore.cookieStore.removeToken('emsi')
      this.rootStore.cookieStore.removeToken('@Emasa/Refresh-Token')
    })
  }
}
