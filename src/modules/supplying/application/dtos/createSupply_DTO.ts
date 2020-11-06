import { Positions } from "@modules/employees/domain/employee.entity";
export interface supplyingProducts {
  supply_id?:string;
  product_id: string;
  quantity: number;
}
export interface SupplyDTO {
  supplier_id: string;
  arrived: boolean;
  ordered_at: Date;
  arrives_at: Date;
}
export interface CreateSupplyDTO {
  supply: SupplyDTO;
  suppliedProducts: supplyingProducts[];
}