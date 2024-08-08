// wms/material
import { post } from "@/utils/request";
export async function fetchMaterial(body: object, params: object) {
  return post("/wms/material/get", body, params);
}

export async function fetchMaterialForOutbound(body: object) {
  return post("/wms/material/getMaterialForOutbound", body);
}

export async function fetchMaterialWithFilters(body: object) {
  return post("/wms/material/get", body);
}

export async function addMaterial(body: object) {
  return post("/wms/material/add", body);
}

export async function updateMaterial(body: object) {
  return post("/wms/material/update", body);
}

export async function deleteMaterial(id: string) {
  return post("/wms/material/delete", { id: id });
}

export async function fetchMaterialRFID() {
  return post("/wms/rfidmaterial/get", {});
}

export async function addMaterialRFID(body: object) {
  return post("/wms/rfidmaterial/add", body);
}
