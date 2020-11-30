import { observable, action } from 'mobx';
import { apiSecret } from '../config/api';
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
  }
  @action pullUser(): Promise<any> {
    this.loadingUser = true;
    return this.get('/users', {
      Cookie: `Access-Token=${this.rootStore.authStore.token};`
    })
      .then(
        action(({ user }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.loadingUser = false;
        })
      );
  }

  // @action updateUser(newUser) {
  //   this.updatingUser = true;
  //   return agent.Auth.save(newUser)
  //     .then(
  //       action(({ user }) => {
  //         this.currentUser = user;
  //       })
  //     )
  //     .finally(
  //       action(() => {
  //         this.updatingUser = false;
  //       })
  //     );
  // }

  // @action forgetUser() {
  //   this.currentUser = undefined;
  // }
}
