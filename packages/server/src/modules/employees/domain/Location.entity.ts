import {
  Cascade,
  Entity,
  Enum,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { v4, validate } from 'uuid';
import { Employee } from './employee.entity';
export interface LocationContainer {
  id?: string;
  cep: string;
  cidade: string;
  rua: string;
  bairro: string;
  numero: number;
  complemento: string;
}
@Entity({ tableName: 'locations' })
export class Location {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public cep: string;
  @Property()
  public cidade: string;
  @Property()
  public rua: string;
  @Property()
  public numero: number;
  @Property()
  public bairro: string;
  @Property()
  public complemento: string;
  @OneToOne({
    entity: () => Employee,
    mappedBy: 'address',
    cascade: [Cascade.ALL],
  })
  public employee: Employee;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  @Property({ name: 'location', persist: false })
  public get Address(): any {
    return {
      cep: this.cep,
      rua: this.rua,
      numero: this.numero,
      bairro: this.bairro,
      complemento: this.complemento,
      cidade: this.cidade
    };
  }
  constructor(container: LocationContainer) {
    this.id = container.id ? container.id : v4();
    this.bairro = container.bairro;
    this.cep = container.cep;
    this.cidade = container.cidade;
    this.complemento = container.complemento;
    this.rua = container.rua;
    this.numero = container.numero;
  }
  static build = ({
    bairro,
    cep,
    cidade,
    complemento,
    numero,
    rua,
    id,
  }: LocationContainer): Location => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    return new Location({ id, rua, numero, complemento, cidade, cep, bairro });
  };
}
