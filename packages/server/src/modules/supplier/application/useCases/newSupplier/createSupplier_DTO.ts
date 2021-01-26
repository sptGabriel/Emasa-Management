import { Positions } from "@modules/employees/domain/employee.entity";

export interface CreateSupplierDTO {
  cnpj:string;
  supplier_name:string;
  supplier_email:string;
  description:string;
}