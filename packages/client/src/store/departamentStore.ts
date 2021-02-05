import {DepartamentModel} from '../models/departamentModel'
import {RootStore} from './rootStore'

export class DepartamentStore {
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
    }).then(({data}) =>
      data.departaments.map((dep: any) => new DepartamentModel(dep)),
    )
  }

  public getCount = async (perPage: number): Promise<number> => {
    return this.rootStore.AxiosStore.get('/departaments/count').then((res) => {
      const page = Math.floor(res.data / perPage)
      if (page < 1) return 1
      return page
    })
  }
}
