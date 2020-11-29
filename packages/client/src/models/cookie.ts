import { flow, types } from 'mobx-state-tree';
import { CurrentUserModel } from './currentUser';
import UniversalCookie from 'universal-cookie';
import { apiSecret } from '../config/api';
import { verify } from 'jsonwebtoken';

const CookieProvider = new UniversalCookie();

export const CookieModel = types
  .model({
    accessToken: types.string
  })
  .actions((self) => ({
    getAccessToken: flow(function* () {
      const token: string = yield CookieProvider.get('Access-Token');
      if (!verify(token, apiSecret)) return `error`;
      self.accessToken = token;
    }),
    removeAccessToken: flow(function* () {
      CookieProvider.remove('Access-Token');
    })
  }));
