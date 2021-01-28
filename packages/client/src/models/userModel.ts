/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'
import {DeviceModel} from './deviceModel'
import {UserAddress} from './userAddressModel'

export type TUser = {
  id: string
  first_name: string
  last_name: string
  username: string
  departament: {
    id: string
    departament_name: string
  }
  avatar: string
  matricula: string
  position: string
  email: string
  biografia: string
  address: UserAddress
  devices: DeviceModel[]
}
export class UserModel implements TUser {
  id: string

  first_name: string

  last_name: string

  username: string

  departament: {
    id: string
    departament_name: string
  }

  matricula: string

  position: string

  email: string

  biografia: string

  avatar: string

  address: UserAddress

  devices: DeviceModel[] = []

  constructor(props?: TUser) {
    makeAutoObservable(this)
    this.id = props ? props.id : ''
    this.first_name = props ? props.first_name : ''
    this.username = props ? props.username : ''
    this.last_name = props ? props.last_name : ''
    this.departament = props
      ? props.departament
      : {departament_name: '', id: ''}
    this.matricula = props ? props.matricula : ''
    this.avatar = props ? props.avatar : ''
    this.biografia = props ? props.biografia : ''
    this.email = props ? props.email : ''
    this.position = props ? props.position : ''
    this.address = props ? props.address : new UserAddress()
    if (props && props.devices) this.devices.push(...props.devices)
  }
}
