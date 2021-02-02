import {DepartamentModel} from '../models/departamentModel'
import {RootStore} from './rootStore'

export class DepartamentStore {
  departaments: DepartamentModel[] = []

  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore
  }
}
