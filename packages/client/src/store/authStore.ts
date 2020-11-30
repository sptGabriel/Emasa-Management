import { action, observable, reaction } from 'mobx';
import { UserModel } from '../models/userModel';
import { RootStore } from './rootStore';
import { apiSecret } from '../config/api';
import { JWTType } from '../models/JWTModel';
import { verify } from 'jsonwebtoken';
import { BaseAPI } from '../shared/infra/services/baseApi';
import CookieUniversal from 'universal-cookie';
import { APIResponse } from '../shared/infra/services/APIResponse';
import { right } from '../shared/core/either';
const Cookie = new CookieUniversal();
export class AuthStore extends BaseAPI {
  @observable token = Cookie.get('Access-Token');
  @observable isAuth = false;
  @observable inProgress = false;
  @observable errors = undefined;
  constructor(rootStore: RootStore) {
    super(rootStore);
    reaction(
      () => this.isAuth,
      (value) => {
        if (!value) return this.remove();
        const decoded: any = verify(this.token, apiSecret);
        if (!decoded) return this.remove();
      }
    );
  }
  @action async login(
    username: string,
    password: string
  ): Promise<APIResponse<UserModel>> {
    this.inProgress = true;
    this.errors = undefined;
    const response: UserModel = await this.post('/users/login', {
      username,
      password
    })
      .then((result) => this.rootStore.userStore.pullUser())
      .catch(
        action((err) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
    return right(response);
  }
  @action logout(): Promise<void> {
    this.remove();
    return Promise.resolve();
  }
  @action remove(): void {
    Cookie.remove('Access-Token');
    this.rootStore.userStore.currentUser = null;
  }
}
