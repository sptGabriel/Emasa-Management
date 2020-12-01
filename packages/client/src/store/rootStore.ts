import { action, observable } from "mobx";
import { AuthStore } from "./authStore";
import { CookieStore } from "./cookieStore";
import { UserStore } from "./userStore";

export class RootStore {
  @observable appName = "Emasa";

  @observable appLoaded = false;

  userStore: UserStore;

  authStore: AuthStore;

  cookieStore: CookieStore;

  constructor() {
    this.cookieStore = new CookieStore(this);
    this.userStore = new UserStore(this);
    this.authStore = new AuthStore(this);
  }

  @action setAppLoaded(): void {
    this.appLoaded = true;
  }
}
