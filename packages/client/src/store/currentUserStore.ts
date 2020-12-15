import {action, runInAction, makeAutoObservable} from 'mobx';
import {UserModel} from '../models/userModel';
import {RootStore} from './rootStore';

export class CurrentUserStore {
  currentUser: UserModel | null = null;

  loadingUser = false;

  updatingUser = false;

  updatingUserErrors = false;

  accessToken!: string;

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, {pullUser: action});
    this.rootStore = rootStore;
  }

  public pullUser = async (): Promise<void> => {
    this.loadingUser = true;
    try {
      if (!this.accessToken) return this.rootStore.authStore.logout();
      return this.rootStore.AxiosStore.get('/users/me').then((res) => {
        this.currentUser = new UserModel(res.data);
      });
    } catch (error) {
      return this.rootStore.authStore.logout();
    } finally {
      this.loadingUser = false;
    }
  };
}
