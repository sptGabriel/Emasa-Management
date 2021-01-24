import {
  Cascade,
  Collection,
  Entity,
  Enum,
  LoadStrategy,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Departament } from '@modules/departaments/domain/departament.entity';
import { User } from '@modules/users/domain/user.entity';
import { ProfilePicture } from '@modules/users/domain/userProfilePicture.entity';
import { v4, validate } from 'uuid';
import { Location } from './Location.entity';
interface employeeUser {
  login: string;
  picture: ProfilePicture  | null
  password: string;
}
export interface EmployeeContainer {
  id?: string;
  email: string;
  biografia: string | null;
  address: Location
  matricula: string;
  departament?: Departament;
  first_name: string;
  last_name: string;
  position: Positions;
  user?: User;
  userProps?: employeeUser;
}
export enum Positions {
  diretor = 'Diretor',
  gerente = 'Gerente',
  tecnico = 'Tecnico',
  coordenador = 'Coordenador',
}
@Entity({ tableName: 'employees' })
@Unique({ properties: ['position', 'departament'] })
export class Employee {
  @PrimaryKey()
  public readonly id: string;
  @Property()
  public matricula: string;
  @Property({ length: 200 })
  public email: string;
  @Property()
  public biografia: string | null;
  @Property({ hidden: true })
  public first_name: string;
  @Property({ hidden: true })
  public last_name: string;
  @Enum()
  public position: Positions;
  @ManyToOne({ entity: () => Departament, name: 'departament_id' })
  public departament: Departament;
  @OneToOne({
    entity: () => User,
    mappedBy: 'employee',
    cascade: [Cascade.PERSIST],
  })
  public user: User;
  @OneToOne(() => Location, location => location, {
    owner: true,
    cascade: [Cascade.PERSIST],
    orphanRemoval: true,
    fieldName: 'address_id',
  })
  public address: Location;
  @Property({ name: 'fullName', persist: false, hidden: true })
  public get getFullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
  @Property()
  public createdAt = new Date();
  @Property({ onUpdate: () => new Date() })
  public updatedAt = new Date();
  @Property()
  public deletedAt?: Date;
  constructor(container: EmployeeContainer) {
    this.id = container.id ? container.id : v4();
    this.matricula = container.matricula;
    this.first_name = container.first_name;
    this.last_name = container.last_name;
    this.biografia = container.biografia;
    this.address = container.address
    this.email = container.email;
    if (container.departament) this.departament = container.departament;
    this.position = container.position;
    if (container.user) this.user = container.user;
  }
  static build = async ({
    id,
    matricula,
    departament,
    first_name,
    last_name,
    position,
    user,
    userProps,
    biografia,
    email,
    address
  }: EmployeeContainer): Promise<Employee> => {
    const isValidUUID = id ? validate(id) : null;
    if (isValidUUID === false) throw new Error(`Invalid UUID V4`);
    if (!departament) throw new Error(`Departament doesn't exist`);
    const employee = new Employee({
      biografia,
      email,
      departament,
      address,
      first_name,
      last_name,
      matricula,
      position,
      user: user ? user : undefined,
      id,
    });
    if (!userProps) return employee;
    const userDomain = await User.build({
      employee: employee,
      login: userProps.login,
      password: userProps.password,
      picture: userProps.picture
    });
    return new Employee({
      id,
      position,
      biografia,
      address,
      email,
      last_name,
      first_name,
      departament,
      matricula,
      user: userDomain,
    });
  };
}
