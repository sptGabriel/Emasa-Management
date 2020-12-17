import jwtDecode from 'jwt-decode';
import {action, configure, makeObservable, runInAction} from 'mobx';
import {LoginModel} from '../models/loginModel';
import {UserModel} from '../models/userModel';
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
      await this.rootStore.AxiosStore.get('/users/me/refresh-token').then(
        (res) => {
          this.rootStore.currentUserStore.accessToken = res.data.access_token;
          this.rootStore.currentUserStore.pullUser();
        },
      );
      this.isAuth = true;
    } catch (error) {
      const mute = error;
      runInAction(() => {
        this.isAuth = false;
      });
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
      }).then((res) => {
        const decoded: any = jwtDecode(res.data.access_token);
        this.rootStore.currentUserStore.currentUser = new UserModel({
          ...decoded,
          id: decoded.sub,
        });
      });
      this.isAuth = true;
    } catch (error) {
      this.errors =
        error.response && error.response.data && error.response.data.message;
      const mute = error;
    } finally {
      this.inProgress = false;
    }
  };

  public logout = async (): Promise<void> => {
    return this.rootStore.AxiosStore.get('/users/me/logout').finally(() => {
      this.isAuth = false;
      this.inProgress = false;
      this.rootStore.currentUserStore.currentUser = null;
      this.rootStore.cookieStore.removeToken('emsi');
      this.rootStore.cookieStore.removeToken('@Emasa/Refresh-Token');
    });
  };
}
