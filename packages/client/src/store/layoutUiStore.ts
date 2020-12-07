import { makeAutoObservable, makeObservable } from 'mobx'
import { RootStore } from './rootStore'

export class LayoutUIStore {
  sideBar = true

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  toggleSideBar = () => {
    this.sideBar = !this.sideBar
  }
}
