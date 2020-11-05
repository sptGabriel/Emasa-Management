import { Positions } from "@modules/employees/domain/employee.entity";
export interface supplyingProducts {
  id: string;
  quantity: string;
}
export interface CreateSupplyDTO {
  supplier_id: string;
  arrived: boolean;
  orderedAt: Date;
  suppliedProducts: supplyingProducts[];
}