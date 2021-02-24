/* eslint-disable camelcase */
export type TDepartamentLogs = {
  id: number
  url: string
  method: string
  code: number
  createdAt: Date
}
export class DepartamentRequestLogs implements TDepartamentLogs {
  id!: number

  url!: string

  method!: string

  code!: number

  createdAt!: Date

  constructor(props?: TDepartamentLogs) {
    if (props && props.id) this.id = props.id
    if (props && props.code) this.code = props.code
    if (props && props.createdAt) this.createdAt = new Date(props.createdAt)
    this.url = props && props.url ? props.url : ''
    this.method = props && props.method ? props.method : ''
  }
}
