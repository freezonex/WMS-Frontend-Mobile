import { post } from "@/utils/request";
export async function addInboundRecord(body: object) {
  return post("/wms/inbound/add", body);
}

export async function updateInboundRecord(body: object) {
  return post("/wms/inbound/update", body);
}

export async function fetchInbound(params: object) {
  return post("/wms/inbound/get", {}, params);
}

// export async function fetchTodayInbound(params) {
//   return post('/today/inbound', {},  params ).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });
// }

// export async function fetchTodayInboundDone(params) {
//   return post('/today/inbound/done', {},  params ).then((res) => {
//     console.log(res);
//     return res.data.data;
//   });
// }

export async function fetchInboundWithFilter(body: object, params: object) {
  return post("/wms/inbound/get", body, params);
}

export async function deleteInbound(body: object) {
  return post("/wms/inbound/delete", body);
}

export async function fetchInboundDetails(body: object) {
  return post("/wms/inbound/get", body);
}
