// wms/outbound
import { post } from "@/utils/request";

export async function addOutboundRecord(body: object) {
  return post("/wms/outbound/add", body);
}

export async function fetchOutbound(body:object,params: object) {
  return post("/wms/outbound/get", body, params);
}

export async function fetchTodayOutbound(params: object) {
  return post("/today/outbound", {}, params);
}

export async function fetchTodayOutboundDone(params: object) {
  return post("/today/outbound/done", {}, params);
}

export async function fetchOutboundWithFilter(body: object, params: object) {
  return post("/wms/outbound/get", body, params);
}

export async function updateOutboundRecord(body: object) {
  return post("/wms/outbound/update", body);
}

export async function deleteOutbound(body: object) {
  return post("/wms/outbound/delete", body);
}

export async function fetchOutboundDetails(body: object) {
  return post("/wms/outbound/get", body);
}
