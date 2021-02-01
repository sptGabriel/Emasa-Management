/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TDevice = {
  id: string
  ip: string
  device: string
  browser: string
  city: string
  state: string
  country: string
  online: boolean
  accessTime: number
}
export class DeviceModel implements TDevice {
  id: string

  ip: string

  device: string

  browser: string

  city: string

  state: string

  country: string

  online: boolean

  accessTime: number

  constructor(props: TDevice) {
    makeAutoObservable(this)
    this.device = props ? props.device : ''
    this.id = props ? props.id : ''
    this.ip = props ? props.ip : ''
    this.browser = props ? props.browser : ''
    this.city = props ? props.city : ''
    this.state = props ? props.state : ''
    this.city = props ? props.city : ''
    this.online = props ? props.online : false
    this.accessTime = props.accessTime
    this.country = props ? props.country : ''
  }
}
