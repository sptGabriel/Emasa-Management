/* eslint-disable camelcase */
export type TDepartamentLogs = {
	id:number
	url:string
	method:string
	code:number
}
export class DepartamentLogs implements TDepartamentLogs {
	id!:number

	url!:string

	method!:string

	code!:number

  constructor(props?: TDepartamentLogs) {
		if(props && props.id) this.id = props.id
		if(props && props.code) this.code = props.code
		this.url = props && props.url ? props.url : ''
		this.method = props && props.method ? props.method : ''
  }
}
