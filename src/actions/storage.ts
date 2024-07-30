// wms/storage
import { post } from "@/utils/request";
export async function fetchSLNameMap(params: object) {
  return post("/wms/storage-location/namemap", {}, params);
}

export async function fetchStorageLocationsByWId(body: object, params: object) {
  return post("/wms/storage-location/get", body, params);
}

export async function addStorageLocation(body: object) {
  return post("/wms/storage-location/add", body);
}

export async function deleteStorageLocation(body: object) {
  return post("/wms/storage-location/delete", body);
}
