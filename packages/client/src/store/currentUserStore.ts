/* eslint-disable no-useless-constructor */
import { action, runInAction, makeAutoObservable } from 'mobx'
import axios from 'axios'
import { UserModel } from '../models/userModel'
import { RootStore } from './rootStore'

export class CurrentUserStore {
  currentUser: UserModel | null = null

  loadingUser = false

  updatingUser = false

  updatingUserErrors = false

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, { pullUser: action })
    this.rootStore = rootStore
    // if (rootStore.cookieStore.getAccessToken()) {
    //   (async () => this.pullUser())();
    // }
  }

  pullUser = async (): Promise<void> => {
    this.loadingUser = true
    try {
      const axiosInstance = axios.create({})
      const callApi = await axiosInstance({
        method: 'GET',
        url: `http://localhost:4000/api/v1/users/me`,
        withCredentials: true
      })
      this.currentUser = new UserModel(callApi.data)
    } catch (error) {
      runInAction(() => {
        this.loadingUser = false
        this.currentUser = null
        this.rootStore.authStore.isAuth = false
      })
      throw error
    } finally {
      this.loadingUser = false
    }
  }
}
