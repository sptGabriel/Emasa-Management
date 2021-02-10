import {DepartamentModel} from '../models/departamentModel'
import {RootStore} from './rootStore'

export class DepartamentStore {
  constructor(private rootStore: RootStore) {
    this.rootStore = rootStore
  }

  public byID = async (id: string): Promise<any> => {
    return this.rootStore.AxiosStore.get(`/departaments/${id}`)
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
      data.departaments.map(
        (dep: any) =>
          new DepartamentModel({
            ...dep,
            criado: new Date(dep.criado).toLocaleDateString('pt-br', {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            }),
          }),
      ),
    )
  }

  public getCount = async (perPage: number): Promise<number> => {
    console.log('ewnter on count')
    return this.rootStore.AxiosStore.get('/departaments/count').then((res) => {
      const page = Math.ceil(res.data / perPage)
      if (page < 1) return 1
      return page
    })
  }
}
