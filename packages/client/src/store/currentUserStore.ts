import {action, runInAction, makeAutoObservable} from 'mobx'
import {UserModel} from '../models/userModel'
import {RootStore} from './rootStore'

export class CurrentUserStore {
  currentUser: UserModel | null = null

  loadingUser = false

  updatingUser = false

  updatingUserErrors = false

  accessToken: string | null = null

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, {pullUser: action})
    this.rootStore = rootStore
  }

  public pullUser = async (): Promise<void> => {
    this.loadingUser = true
    try {
      if (!this.accessToken) return
      const user = await this.rootStore.AxiosStore.get('/users/me')
      return runInAction(() => {
        this.currentUser = new UserModel(user.data)
        if (this.currentUser) this.rootStore.authStore.isAuth = true
      })
    } catch (error) {
      runInAction(() => {
        this.rootStore.authStore.isAuth = false
      })
      throw error
    } finally {
      runInAction(() => {
        this.loadingUser = false
      })
    }
  }
}
