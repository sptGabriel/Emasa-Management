import { Positions } from '@modules/employees/domain/employee.entity';
export interface employeeUser {
  login: string;
  password: string;
}
interface IPicture {
  bytes: number;
  public_id: string;
  url: string;
}
export interface location {
    cep: string;
    cidade: string;
    rua: string;
    bairro: string;
    numero: number;
    complemento: string;
  
}
export interface NewEmployeeDTO {
  matricula: string;
  email: string;
  biografia?: string;
  first_name: string;
  last_name: string;
  position: Positions;
  departament_id: string;
  address: location
  user_credentials: employeeUser;
  picture?: IPicture;
}
