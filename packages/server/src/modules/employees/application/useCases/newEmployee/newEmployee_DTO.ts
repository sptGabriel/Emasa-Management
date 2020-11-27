import { Positions } from '@modules/employees/domain/employee.entity';
export interface employeeUser {
  login: string;
  password: string;
  ip_address:string;
}
export interface NewEmployeeDTO {
  matricula: string;
  first_name: string;
  last_name: string;
  position: Positions;
  departament_id: string;
  user_credentials: employeeUser;
}
