import {action, configure, makeObservable, runInAction} from 'mobx';
import {LoginModel} from '../models/loginModel';
import {RootStore} from './rootStore';

configure({
  enforceActions: 'never',
});
export class AuthStore {
  isAuth = false;

  inProgress = false;

  errors = undefined;

  rootStore: RootStore;

  loginModel = new LoginModel();

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      login: action,
      logout: action,
      isAuth: true,
      inProgress: true,
      errors: true,
      rootStore: true,
      loginModel: true,
    });
    this.rootStore = rootStore;
  }

  public refreshToken = async (): Promise<void> => {
    this.inProgress = true;
    try {
      await this.rootStore.AxiosStore.get('/users/me/refresh-token')
        .then(() => {
          this.rootStore.currentUserStore.pullUser();
        })
        .then(() => {
          this.isAuth = true;
        });
    } catch (error) {
      runInAction(() => {
        this.rootStore.authStore.isAuth = false;
      });
      throw error;
    } finally {
      this.inProgress = false;
    }
  };

  public login = async (): Promise<void> => {
    this.inProgress = true;
    this.errors = undefined;
    try {
      await this.rootStore.AxiosStore.post('/login', {
        login: this.loginModel.login,
        password: this.loginModel.password,
      }).then(() => this.rootStore.currentUserStore.pullUser());
      this.isAuth = true;
    } catch (error) {
      this.errors =
        error.response && error.response.data && error.response.data.message;
      throw error.response.data.message;
    } finally {
      this.inProgress = false;
    }
  };

  public logout = (): Promise<void> => {
    this.rootStore.currentUserStore.currentUser = null;
    this.rootStore.cookieStore.removeToken('eid');
    this.rootStore.cookieStore.removeToken('@Emasa/Refresh-Token');
    this.rootStore.cookieStore.removeToken('@Emasa/Access-Token');
    return Promise.resolve();
  };
}
