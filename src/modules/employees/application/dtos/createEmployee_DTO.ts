import { Positions } from "@modules/employees/domain/employee.entity";

export interface CreateEmployeeDTO {
  matricula:string;
  first_name:string;
  last_name:string;
  position:Positions
  departament_id:string;
}