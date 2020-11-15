import { ProductTypes } from '@modules/products/domain/productInstance.entity';

export interface AssignProductDTO {
  serial_number: string;
  patrimony_code: string;
  product_id: string;
  contract_id: string;
  matricula: string;
  departament_id:string | null;
  patrimony_parent: string | null;
  type: ProductTypes;
}
