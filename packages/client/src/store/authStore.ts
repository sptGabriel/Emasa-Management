/* eslint-disable no-useless-constructor */
/* eslint-disable consistent-return */
import { action, observable, reaction } from "mobx";
import { UserModel } from "../models/userModel";
import { RootStore } from "./rootStore";
import { BaseAPI } from "../shared/infra/services/baseApi";

export class AuthStore extends BaseAPI {
  @observable isAuth = false;

  @observable inProgress = false;

  @observable errors = undefined;

  constructor(rootStore: RootStore) {
    super(rootStore);
    if (
      rootStore.userStore.currentUser &&
      rootStore.cookieStore.getAccessToken()
    )
      this.isAuth = true;
  }

  @action async login(login: string, password: string): Promise<UserModel> {
    this.inProgress = true;
    this.errors = undefined;
    try {
      const response: UserModel = await this.post("/login", {
        login,
        password,
      }).then(() => this.rootStore.userStore.pullUser());
      if (response) this.isAuth = true;
      return response;
    } catch (error) {
      this.errors =
        error.response && error.response.body && error.response.body.errors;
      throw error;
    }
  }

  @action logout(): Promise<void> {
    this.rootStore.cookieStore.removeAccessToken();
    return Promise.resolve();
  }
}
