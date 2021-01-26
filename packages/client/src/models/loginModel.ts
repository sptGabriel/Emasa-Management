import {makeAutoObservable} from 'mobx'

type TLogin = {
  login: string
  password: string
}
export class LoginModel implements TLogin {
  login!: string

  password!: string

  constructor() {
    makeAutoObservable(this)
  }
}
