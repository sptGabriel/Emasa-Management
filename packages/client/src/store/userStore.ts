/* eslint-disable no-useless-constructor */
import { observable, action, runInAction } from 'mobx';
import { UserModel } from '../models/userModel';
import { BaseAPI } from '../shared/infra/services/baseApi';
import { RootStore } from './rootStore';

export class UserStore extends BaseAPI {
  @observable currentUser: UserModel | null = null;

  @observable loadingUser = false;

  @observable updatingUser = false;

  @observable updatingUserErrors = false;

  constructor(rootStore: RootStore) {
    super(rootStore);
    if (rootStore.cookieStore.getAccessToken()) {
      (async () => this.pullUser())();
    }
  }

  @action pullUser = async (): Promise<void> => {
    this.loadingUser = true;
    try {
      await this.get('/users/me', {
        Cookie: `Access-Token=${this.rootStore.cookieStore.getAccessToken()};`
      }).then(
        action('fetchSuccess', ({ data }: any) => {
          const model = new UserModel(data);
          if (model) this.currentUser = model;
          this.loadingUser = false;
        }),
        action('fetchError', (error: Error) => {
          throw error;
        })
      );
      // runInAction(() => {
      //   this.currentUser = new UserModel(data);
      //   this.loadingUser = false;
      // });
    } catch (error) {
      runInAction(() => {
        this.loadingUser = false;
        this.currentUser = null;
        this.rootStore.authStore.isAuth = false;
      });
      throw error;
    }
  };
}
