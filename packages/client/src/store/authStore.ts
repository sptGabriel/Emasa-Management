/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import Axios from 'axios'
import { action, makeAutoObservable } from 'mobx'
import { RootStore } from './rootStore'

export class AuthStore {
  isAuth = false

  inProgress = false

  errors = undefined

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
    // autorun(() => {
    //   if (
    //     this.rootStore.cookieStore.getAccessToken() &&
    //     this.rootStore.userStore.currentUser
    //   ) {
    //     console.log('a');
    //     this.isAuth = true;
    //   }
    //   console.log(this.isAuth);
    // });
  }

  @action async login(login: string, password: string): Promise<void> {
    this.inProgress = true
    this.errors = undefined
    try {
      await Axios({
        method: 'POST',
        url: `http://localhost:4000/api/v1/login`,
        data: { login, password },
        headers: {
          crossDomain: true,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }).then(() => this.rootStore.currentUserStore.pullUser())
      this.isAuth = true
    } catch (error) {
      this.errors =
        error.response && error.response.body && error.response.body.errors
      throw error
    }
  }

  @action logout(): Promise<void> {
    this.rootStore.cookieStore.removeAccessToken()
    return Promise.resolve()
  }
}
