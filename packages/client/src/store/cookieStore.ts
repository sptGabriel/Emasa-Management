import CookieUniversal from 'universal-cookie'
import {RootStore} from './rootStore'

export class CookieStore {
  private cookie: CookieUniversal

  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore
    this.cookie = new CookieUniversal()
  }

  public getToken = (key: string): string => {
    return this.cookie.get(key)
  }

  public removeToken = (key: string): void => {
    return this.cookie.remove(key)
  }
}
