import { flow, types } from 'mobx-state-tree';
import { type } from 'os';
import { CookieModel } from './cookie';
import { CurrentUserModel } from './currentUser';
import { verify } from 'jsonwebtoken';
import { apiSecret } from '../config/api';
export const Auth = types
  .model({
    authToken: types.maybe(CookieModel),
    isAuth: types.boolean,
    currentUser: types.maybe(CurrentUserModel)
  })
  .actions((self) => ({
    setupAuth: flow(function* () {
      yield self.getAuthToken();
      yield self.getUserInfo();
    }),
    login: flow(function* (login: LoginModel) {
      try {
        const res = yield customersApi
          .post({
            token: providerToken,
            provider
          })
          .json();

        if (res.token) {
          self.authToken = res.token;
          yield self.saveToken(res.token);
          yield self.getUserInfo();
        }
      } catch (error) {
        console.log('error', error);
      }
    }),
    logout: flow(function* () {
      try {
        if (!self.isAuth) return;
        self.isAuth = false;
        self.authToken?.removeAccessToken();
      } catch (error) {
        console.log('error', error);
      }
    })
  }));
