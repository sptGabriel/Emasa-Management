/* eslint-disable no-useless-constructor */
import { observable, action } from "mobx";
import { UserModel } from "../models/userModel";
import { BaseAPI } from "../shared/infra/services/baseApi";
import { RootStore } from "./rootStore";

export class UserStore extends BaseAPI {
  @observable currentUser: UserModel | null = null;

  @observable loadingUser = false;

  @observable updatingUser = false;

  @observable updatingUserErrors = false;

  constructor(rootStore: RootStore) {
    super(rootStore);
    if (rootStore.cookieStore.getAccessToken()) this.pullUser();
  }

  @action pullUser = async (): Promise<UserModel> => {
    this.loadingUser = true;
    if (!this.rootStore.cookieStore.getAccessToken())
      return Promise.reject(new Error(`Invalid Token`));
    try {
      const currentUser: UserModel = await this.get("/users/me", {
        Cookie: `Access-Token=${this.rootStore.cookieStore.getAccessToken()};`,
      }).then(
        action(({ data }: any) => {
          this.currentUser = new UserModel(data);
          return data;
        })
      );
      this.rootStore.authStore.isAuth = true;
      this.loadingUser = false;
      return currentUser;
    } catch (error) {
      this.loadingUser = false;
      this.currentUser = null;
      this.rootStore.authStore.isAuth = false;
      throw error;
    }
  };

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
