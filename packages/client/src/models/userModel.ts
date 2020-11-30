import { observable } from 'mobx';

type TUser = {
  id: string;
  name: string;
  departament_id: string;
  matricula: string;
  position: string;
};
export class UserModel implements TUser {
  @observable id: string;
  @observable name: string;
  @observable departament_id: string;
  @observable matricula: string;
  @observable position: string;
  constructor(props: TUser) {
    this.id = props.id;
    this.name = props.name;
    this.departament_id = props.departament_id;
    this.matricula = props.matricula;
    this.position = props.position;
  }
}
