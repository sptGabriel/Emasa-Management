import { action, observable } from 'mobx';
import { AuthStore } from './authStore';
import { UserStore } from './userStore';
export class RootStore {
  @observable appName = 'Emasa';
  @observable appLoaded = false;
  userStore: UserStore;
  authStore: AuthStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }
  @action setAppLoaded(): void {
    this.appLoaded = true;
  }
}
