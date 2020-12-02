/* eslint-disable consistent-return */
import { action, computed, makeAutoObservable, observable } from 'mobx';
import CookieUniversal from 'universal-cookie';
import { RootStore } from './rootStore';

export class CookieStore {
  private cookie: CookieUniversal;

  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore;
    this.cookie = new CookieUniversal();
  }

  getAccessToken = (): string => {
    return this.cookie.get('Access-Token');
  };

  removeAccessToken = (): void => {
    return this.cookie.remove('Access-Token');
  };
}
