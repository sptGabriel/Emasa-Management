export interface AssignEquipmentDTO {
  patrimony_code: string;
  component_sn: string;
  matricula: string;
  by_employee: string;
  to_employee: string;
  components?: string[];
}
