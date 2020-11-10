import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Supply } from '@modules/supplying/domain/supplying.entity';
import { isString } from '@utils/isString';
import { v4, validate } from 'uuid';

export interface ContractProps {
  id?: string;
  name: string;
  signature: string;
}

@Entity({ tableName: 'contracts' })
export class Contract {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public name: string;
  @Property()
  public signature: string;
  @OneToOne(() => Supply, supply => supply.contract)
  public supply!: Supply;
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;

  constructor(container: ContractProps) {
    this.id = container.id ? container.id : v4();
    this.name = container.name;
    this.signature = container.signature;
  }

  static build = ({ name, signature, id }: ContractProps): Contract => {
    if (id && !validate(id)) throw new Error(`Invalid UUID V4`);
    if (!isString(name)) throw new Error(`${name}, invalid`);
    return new Contract({ name, id, signature });
  };
}
