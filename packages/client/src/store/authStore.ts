/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import { action, makeAutoObservable, makeObservable } from 'mobx'
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

  async login(login: string, password: string): Promise<void> {
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

  logout(): Promise<void> {
    this.rootStore.currentUserStore.currentUser = null
    this.rootStore.cookieStore.removeToken('eid')
    return Promise.resolve()
  }
}
