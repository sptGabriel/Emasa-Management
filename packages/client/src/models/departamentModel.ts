/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

export type TDepartament = {
  id: string
  nome: string
  sigla: string
  diretor: string
  gerente: string
  coordenador: string
  criado: Date
}
export class DepartamentModel implements TDepartament {
  id!: string

  nome!: string

  sigla!: string

  diretor!: string

  gerente!: string

  coordenador!: string

  criado!: Date
  constructor(props?: TDepartament) {
    this.id = props ? props.id : ''
    this.coordenador = props ? props.coordenador : ''
    this.gerente = props ? props.gerente : ''
    this.diretor = props ? props.diretor : ''
    this.nome = props ? props.nome : ''
    this.sigla = props ? props.sigla : ''
    if (props && props.criado) this.criado = props.criado
  }
}
