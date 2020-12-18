import jwtDecode from 'jwt-decode'
import {makeAutoObservable, runInAction} from 'mobx'
import {UserModel} from '../models/userModel'
import {AuthStore} from './authStore'
import {AxiosStore} from './axiosStore'
import {CookieStore} from './cookieStore'
import {CurrentUserStore} from './currentUserStore'
import {LayoutUIStore} from './layoutUiStore'

export class RootStore {
  appName = 'Emasa'

  appState = 'peding'

  currentUserStore: CurrentUserStore

  authStore: AuthStore

  cookieStore: CookieStore

  AxiosStore: AxiosStore

  layoutStore: LayoutUIStore

  constructor() {
    makeAutoObservable(this)
    this.AxiosStore = new AxiosStore(this)
    this.AxiosStore.enableInterceptors()
    this.cookieStore = new CookieStore(this)
    this.currentUserStore = new CurrentUserStore(this)
    this.authStore = new AuthStore(this)
    this.layoutStore = new LayoutUIStore(this)
  }

  public initApi = async (): Promise<void> => {
    this.appState = 'pending'
    try {
      const api = await this.AxiosStore.get('/')
      if (!api) throw new Error('Server Unavaliable')
      if (api && !api.data.access_token) {
        return runInAction(() => {
          this.appState = 'fulfilled'
        })
      }
      const decoded: any = jwtDecode(api.data.access_token)
      if (decoded instanceof Error) Promise.reject()
      return runInAction(() => {
        this.currentUserStore.accessToken = api.data.access_token
        this.currentUserStore.currentUser = new UserModel({
          ...decoded,
          id: decoded.sub,
        })
        this.appState = 'fulfilled'
        this.authStore.isAuth = true
      })
    } catch (error) {
      runInAction(() => {
        this.appState = 'error'
      })
      throw error
    }
  }
}

//  .then(({data}) => {
//  if (!data.acessToken)
//    return runInAction(() => {
//      this.appState = 'fulfilled'
//    })
//  const decoded: any = jwtDecode(data.access_token)
//  if (decoded instanceof Error) Promise.reject()
//  runInAction(() => {
//    this.currentUserStore.accessToken = data.access_token
//    this.currentUserStore.currentUser = new UserModel({
//      ...decoded,
//      id: decoded.sub,
//    })
//    this.appState = 'fulfilled'
//    this.authStore.isAuth = true
//  })
//  })

//  this.authStore.inProgress = true;
//  try {
//  await this.AxiosStore.get('/')
//    .then((res) => {
//      console.log(res);
//      if (!res.data.access_token && res.status === 200) {
//        return runInAction(() => {
//          this.authStore.isAuth = false;
//          this.setAppLoaded();
//        });
//      }
//      const decoded: any = jwtDecode(res.data.access_token);
//      return runInAction(() => {
//        if (!(decoded instanceof Error)) {
//          this.currentUserStore.accessToken = res.data.access_token;
//          this.currentUserStore.currentUser = new UserModel({
//            ...decoded,
//            id: decoded.sub,
//          });
//        }
//      });
//    })
//    .then(() =>
//      runInAction(() => {
//        if (!this.currentUserStore.currentUser) return;
//        this.authStore.isAuth = true;
//        this.setAppLoaded();
//      }),
//    );
//  } catch (error) {
//  console.log(error);
//  const mute = error;
//  runInAction(() => {
//    this.authStore.isAuth = false;
//  });
//  } finally {
//  runInAction(() => {
//    this.authStore.inProgress = false;
//  });
//  }
