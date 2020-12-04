import { action, makeObservable, runInAction } from 'mobx'
import { RootStore } from './rootStore'

export class AuthStore {
  isAuth = false

  inProgress = false

  errors = undefined

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      login: action,
      logout: action,
      isAuth: true,
      inProgress: true,
      errors: true,
      rootStore: true
    })
    this.rootStore = rootStore
  }

  public refreshToken = async (): Promise<void> => {
    this.inProgress = true
    try {
      await this.rootStore.AxiosStore.get('/users/me/refresh-token')
        .then(() => {
          this.rootStore.currentUserStore.pullUser()
        })
        .then(() => {
          this.isAuth = true
        })
    } catch (error) {
      runInAction(() => {
        this.rootStore.authStore.isAuth = false
      })
      throw error
    } finally {
      this.inProgress = false
    }
  }

  public login = async (login: string, password: string): Promise<void> => {
    this.inProgress = true
    this.errors = undefined
    try {
      await this.rootStore.AxiosStore.post('/login', {
        login,
        password
      }).then(() => this.rootStore.currentUserStore.pullUser())
      this.isAuth = true
    } catch (error) {
      this.errors =
        error.response && error.response.body && error.response.body.errors
      throw error
    } finally {
      this.inProgress = false
    }
  }

  public logout = (): Promise<void> => {
    this.rootStore.currentUserStore.currentUser = null
    this.rootStore.cookieStore.removeToken('eid')
    this.rootStore.cookieStore.removeToken('@Emasa/Refresh-Token')
    this.rootStore.cookieStore.removeToken('@Emasa/Access-Token')
    return Promise.resolve()
  }
}
