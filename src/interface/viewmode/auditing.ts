export interface IAuditingMaterial {
  material_id: string;
  material_name: string;
  material_code: string;
  specification: string;
  quantity: string;
  unit: string;
  location_id: string;
}
export interface IAuditingCreateVM {
  whName: string;
  storageName: string;
  storage_location_id: string;
  materials: IAuditingMaterial[];
}
