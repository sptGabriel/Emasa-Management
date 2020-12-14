import {makeAutoObservable} from 'mobx';
import {AuthStore} from './authStore';
import {AxiosStore} from './axiosStore';
import {CookieStore} from './cookieStore';
import {CurrentUserStore} from './currentUserStore';
import {LayoutUIStore} from './layoutUiStore';

export class RootStore {
  appName = 'Emasa';

  appLoaded = false;

  currentUserStore: CurrentUserStore;

  authStore: AuthStore;

  cookieStore: CookieStore;

  AxiosStore: AxiosStore;

  layoutStore: LayoutUIStore;

  constructor() {
    makeAutoObservable(this);
    this.AxiosStore = new AxiosStore(this);
    this.AxiosStore.enableInterceptors();
    this.cookieStore = new CookieStore(this);
    this.currentUserStore = new CurrentUserStore(this);
    this.authStore = new AuthStore(this);
    this.layoutStore = new LayoutUIStore(this);
  }

  public setAppLoaded = (): void => {
    this.appLoaded = true;
  };
}
