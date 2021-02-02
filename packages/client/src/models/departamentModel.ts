/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TDepartament = {
  Nome: string
  Diretor: string
  Gerente: string
  Coordenador: string
  Criado: Date
}
export class DepartamentModel implements TDepartament {
  Nome!: string

  Diretor!: string

  Gerente!: string

  Coordenador!: string

  Criado!: Date
  constructor(props?: TDepartament) {
    makeAutoObservable(this)
    this.Coordenador = props ? props.Coordenador : ''
    this.Gerente = props ? props.Gerente : ''
    this.Diretor = props ? props.Diretor : ''
    this.Nome = props ? props.Nome : ''
  }
}
