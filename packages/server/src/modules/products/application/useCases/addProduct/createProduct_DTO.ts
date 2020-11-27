export interface CreateProductDTO {
  name: string;
  cod_reference: string;
  category_id: string;
  has_instances: boolean;
  current_price: number;
}
