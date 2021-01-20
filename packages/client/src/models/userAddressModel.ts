/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TAddress = {
  cep: string
  cidade: string
  rua: string
  bairro: string
  numero: string
  complemento: string
}
export class UserAddress implements TAddress {
  cep!: string

  cidade!: string

  rua!: string

  bairro!: string

  numero!: string

  complemento!: string

  constructor(props?: TAddress) {
    makeAutoObservable(this)
   this.cep = props ? props.cep : ''
    this.bairro =props ? props.bairro : ''
    this.cidade = props ? props.cidade : ''
    this.complemento = props ? props.complemento : ''
    this.numero = props ? props.numero : ''
    this.rua = props ? props.rua : ''
  }
}
