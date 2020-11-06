import { ProductTypes } from '@modules/products/domain/productInstance.entity';

export interface AssignProductDTO {
  serial_number: string;
  patrimony_code: string;
  product_id: string;
  contract_id: string;
  employee_id: string;
  parent_id: string;
  type: ProductTypes;
}
