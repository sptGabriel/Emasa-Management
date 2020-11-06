import { Positions } from '@modules/employees/domain/employee.entity';

export interface CreateProductDTO {
  name: string;
  cod_reference: string;
  category_id: string;
  quantity: string;
}
