// wms/stocktaking
import { post } from "@/utils/request";
export async function addStocktakingRecord(body: object) {
  return post("/wms/stocktaking/add", body);
}

export async function fetchStocktaking(body: object, params: object) {
  return post("/wms/stocktaking/get", body, params);
}

export async function deleteStocktaking(body: object) {
  return post("/wms/stocktaking/delete", body);
}

export async function fetchStocktakingDetails(body: object) {
  return post("/wms/stocktaking/detail", body);
}


