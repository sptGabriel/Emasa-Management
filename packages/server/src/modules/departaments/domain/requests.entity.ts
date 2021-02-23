import {
  Cascade,
  Entity,
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
  @OneToOne(() => Departament, departament => departament, {
    fieldName: 'departament_id',
    owner: true
  })
  public readonly departament: Departament;
  @Property()
  public url: string;
  @Property()
  public code: number;
  @Property()
  public method: string;
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
