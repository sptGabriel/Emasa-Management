import {promises} from 'fs'
import {action, runInAction, makeAutoObservable} from 'mobx'
import {DeviceModel} from '../models/deviceModel'
import {UserAddress} from '../models/userAddressModel'
import {UserModel} from '../models/userModel'
import {cepMask} from '../shared/utils/cepMask'
import {RootStore} from './rootStore'

export class CurrentUserStore {
  currentUser!: UserModel

  loadingUser = false

  updatingUser = false

  updatingUserErrors = false

  accessToken: string | null = null

  loadingProfileImage = false

  constructor(public rootStore: RootStore) {
    makeAutoObservable(this, {pullUser: action})
    this.rootStore = rootStore
  }

  public changeAvatar = async (url: any): Promise<any> => {
    this.loadingProfileImage = true
    const requestUrl = `/users/${this.currentUser?.id}/change_profile_image`
    return this.rootStore.AxiosStore.post(
      requestUrl,
      JSON.stringify({data: url}),
    ).then((res) => {
      if (res && this.currentUser) this.currentUser.avatar = res.data.avatar
      if (!res || !this.currentUser)
        Promise.reject(new Error(`Contate Gabriel`))
      Promise.resolve()
    })
  }

  public pullUser = async (): Promise<void> => {
    this.loadingUser = true
    try {
      if (!this.accessToken) return
      const user = await this.rootStore.AxiosStore.get('/users/me')
      return runInAction(() => {
        if (user && user.data) {
          const address = new UserAddress({
            ...user.data.address,
            cep: cepMask(user.data.address.cep),
          })
          const devices = user.data.devices.map(
            (device: any) => new DeviceModel({...device}),
          )
          this.currentUser = new UserModel({...user.data, address, devices})
        }
        if (this.currentUser) this.rootStore.authStore.isAuth = true
      })
    } catch (error) {
      runInAction(() => {
        this.rootStore.authStore.isAuth = false
      })
      throw error
    } finally {
      runInAction(() => {
        this.loadingUser = false
      })
    }
  }
}
