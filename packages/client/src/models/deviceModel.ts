/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TDevice = {
  device: string
  browser: string
  city: string
  state: string
  country: string
  online: boolean
  accessTime: Date | undefined
}
export class DeviceModel implements TDevice {
  device: string

  browser: string

  city: string

  state: string

  country: string

  online: boolean

  accessTime: Date | undefined

  constructor(props?: TDevice) {
    makeAutoObservable(this)
    this.device = props ? props.device : ''
    this.browser = props ? props.browser : ''
    this.city = props ? props.city : ''
    this.state = props ? props.state : ''
    this.city = props ? props.city : ''
    this.online = props ? props.online : false
    this.accessTime = props ? props.accessTime : undefined
    this.country = props ? props.country : ''
  }
}
