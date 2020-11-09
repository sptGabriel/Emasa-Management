import { Positions } from '@modules/employees/domain/employee.entity';

export interface CreateProductCategoryDTO {
  name: string;
  parent_id: string | null;
}
