export interface supplyingProducts {
  supply_id?: string;
  product_id: string;
  quantity: number;
  unit_price: number;
}
export interface SupplyDTO {
  supplier_id: string;
  contract_id: string;
  arrived: boolean;
  ordered_at: Date;
  arrives_at: Date;
  total_amount:number;
}
export interface addSupplyDTO {
  supply: SupplyDTO;
  suppliedProducts: supplyingProducts[];
}
export interface addStock {
   product_id:string;
   supply_id:string;
   quantity:number;
}