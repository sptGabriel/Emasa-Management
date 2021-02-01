/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TChangePassword = {
  oldPassword: string
  confirmPassword: string
  password: string
}
export class ChangePassword implements TChangePassword {
  oldPassword!: string

  confirmPassword!: string

  password!: string

  constructor(props?: TChangePassword) {
    makeAutoObservable(this)
    this.oldPassword = props ? props.oldPassword : ''
    this.password = props ? props.password : ''
    this.confirmPassword = props ? props.confirmPassword : ''
  }
}
