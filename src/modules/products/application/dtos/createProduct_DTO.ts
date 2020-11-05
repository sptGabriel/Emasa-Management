import { Positions } from "@modules/employees/domain/employee.entity";

export interface CreateProductDTO {
  name:string;
  codReference:string;
  category_id:string;
  quantity:string;
}