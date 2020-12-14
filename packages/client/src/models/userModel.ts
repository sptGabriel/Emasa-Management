/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx';
import {LoginModel} from './loginModel';

type TUser = {
  id: string;
  name: string;
  departament_id: string;
  matricula: string;
  position: string;
  user: LoginModel;
};
export class UserModel implements TUser {
  id: string;

  name: string;

  departament_id: string;

  matricula: string;

  position: string;

  user!: LoginModel;

  constructor(props: TUser) {
    makeAutoObservable(this);
    this.id = props.id;
    this.name = props.name;
    this.departament_id = props.departament_id;
    this.matricula = props.matricula;
    this.position = props.position;
    this.user = props.user;
  }
}
