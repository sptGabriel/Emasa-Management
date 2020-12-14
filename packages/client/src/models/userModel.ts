/* eslint-disable camelcase */
import {makeAutoObservable} from 'mobx';

type TUser = {
  id: string;
  name: string;
  departament_id: string;
  matricula: string;
  position: string;
};
export class UserModel implements TUser {
  id: string;

  name: string;

  departament_id: string;

  matricula: string;

  position: string;

  constructor(props: TUser) {
    makeAutoObservable(this);
    this.id = props.id;
    this.name = props.name;
    this.departament_id = props.departament_id;
    this.matricula = props.matricula;
    this.position = props.position;
  }
}
