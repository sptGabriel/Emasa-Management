import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { AuthStore } from './authStore';
import { CookieStore } from './cookieStore';
import { UserStore } from './userStore';

export class RootStore {
  appName = 'Emasa';

  appLoaded = false;

  userStore: UserStore;

  authStore: AuthStore;

  cookieStore: CookieStore;

  constructor() {
    makeAutoObservable(this);
    this.cookieStore = new CookieStore(this);
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }

  setAppLoaded(): void {
    this.appLoaded = true;
  }
}
