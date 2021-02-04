import {runInAction} from 'mobx'
import {DepartamentModel} from '../models/departamentModel'
import {RootStore} from './rootStore'

export class DepartamentStore {
  total = 0

  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore
  }

  public getDepartamentsPage = async (
    perPage: number,
    currentPage: number,
  ): Promise<DepartamentModel[]> => {
    return this.rootStore.AxiosStore.get('/departaments', {
      params: {
        page: currentPage,
        perPage,
      },
    }).then(({data}) => {
      runInAction(() => {
        this.total = data.total
      })
      return data.departaments.map((dep: any) => new DepartamentModel(dep))
    })
  }
}
