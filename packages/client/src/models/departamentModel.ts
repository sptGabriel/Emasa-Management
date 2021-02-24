/* eslint-disable camelcase */
import {DepartamentRequestLogs} from './departamentRequestLogs'
import {UserModel} from './userModel'

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
  employees: UserModel[]
  requestLogs: DepartamentRequestLogs[]
  createdAt: Date
  status: boolean
}
export class DepartamentModel implements TDepartament {
  id!: string

  nome!: string

  sigla!: string

  diretor!: IPositions

  gerente!: IPositions

  coordenador!: IPositions

  employees: UserModel[] = []

  requestLogs: DepartamentRequestLogs[] = []

  createdAt!: Date

  status!: boolean

  constructor(props?: any) {
    console.log(props)
    this.id = props ? props.id : ''
    this.status = props ? props.status : false
    this.coordenador =
      props && props.coordenador
        ? {...props.coordenador, nome: props.coordenador.name}
        : {nome: '', matricula: ''}
    this.gerente =
      props && props.gerente
        ? {...props.gerente, nome: props.gerente.name}
        : {nome: '', matricula: ''}
    this.diretor =
      props && props.diretor
        ? {...props.diretor, nome: props.diretor.name}
        : {nome: '', matricula: ''}
    this.nome = props ? props.nome : ''
    this.sigla = props ? props.sigla : ''
    if (props) this.employees.push(...props.employees)
    this.requestLogs.push(
      ...props.requestLogs.map(
        (log: DepartamentRequestLogs) => new DepartamentRequestLogs(log),
      ),
    )
    if (props && props.createdAt) this.createdAt = new Date(props.createdAt)
  }
}
