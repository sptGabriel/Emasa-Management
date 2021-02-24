import {
  Cascade,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Departament } from './departament.entity';

interface DepartamentRequestsContainer {
  departament: Departament;
  url: string;
  code: number;
  method: string;
}
@Entity({ tableName: 'department_requests' })
export class DepartamentRequests {
  @PrimaryKey()
  public readonly id: number;
  @ManyToOne({ entity: () => Departament, name: 'departament_id' })
  public departament: Departament;
  @Property()
  public url: string;
  @Property()
  public code: number;
  @Property()
  public method: string;
  @Property({ name: 'requestsFormat', persist: false })
  public get formatedReponse(): any {
    return {
      id: this.id,
      departament_id: this.departament.id,
      url: this.url,
      code: this.code,
      method: this.method,
      createdAt: this.createdAt
    }
  }
  @Property()
  public createdAt = new Date();

  constructor({
    code,
    departament,
    method,
    url,
  }: DepartamentRequestsContainer) {
    if (code) this.code = code;
    if (departament) this.departament = departament;
    if (method) this.method = method;
    if (url) this.url = url;
  }

  static build = ({
    url,
    method,
    departament,
    code,
  }: DepartamentRequestsContainer): DepartamentRequests => {
    if (!(departament instanceof Departament)) {
      throw new Error(`Invalid departament type`);
    }
    return new DepartamentRequests({ code, departament, method, url });
  };
}
