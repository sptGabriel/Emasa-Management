/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx'

interface IPositions {
  matricula: string
  nome: string
}

export type TDepartament = {
  id: string
  nome: string
  sigla: string
  diretor: IPositions
  gerente: IPositions
  coordenador: IPositions
  criado: Date
}
export class DepartamentModel implements TDepartament {
  id!: string

  nome!: string

  sigla!: string

  diretor!: IPositions

  gerente!: IPositions

  coordenador!: IPositions

  criado!: Date
  constructor(props?: any) {
    this.id = props ? props.id : ''
    this.coordenador = props
      ? {...props.coordenador}
      : {nome: '', matricula: ''}
    this.gerente = props
      ? {...props.gerente, nome: props.gerente.getFullName}
      : {nome: '', matricula: ''}
    this.diretor = props ? {...props.diretor} : {nome: '', matricula: ''}
    this.nome = props ? props.nome : ''
    this.sigla = props ? props.sigla : ''
    if (props && props.criado) this.criado = props.criado
  }
}
