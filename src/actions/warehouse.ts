import { post } from "@/utils/request";

export async function fetchWarehouses(body: object, params: object) {
  return post("/wms/warehouse/get", body, params);
}

export async function fetchWarehousesWithFilters(body: object, params: object) {
  return post("/wms/warehouse/get", body, params);
}

export async function AddWarehouses(body: object) {
  return post("/wms/warehouse/add", body);
}

export async function deleteWarehouse(id: string) {
  return post("/wms/warehouse/delete", { id: id });
}

export async function updateWarehouse(body: object) {
  return post("/wms/warehouse/update", body);
}

export async function fetchWHNameMap(params: object) {
  return post("/wms/warehouse/namemap", {}, params);
}

export async function fetchWHSLNameMap(params: object) {
  return post("/wms/warehouse/storagelocation/idmap", {}, params);
}
