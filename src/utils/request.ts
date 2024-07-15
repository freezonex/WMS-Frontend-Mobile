import axios from "axios";
import qs from "qs";
import type { IResponseResult } from "@/interface/IReqsposeResult";

axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";

axios.defaults.withCredentials = true;

const service = axios.create({
  baseURL: "/webapi",
  withCredentials: true,
  timeout: 100000,
});

service.interceptors.request.use(
  (config: any) => {
    if (/get/i.test(config.method)) {
      config.params = config.params || {};
      config.params.t = new Date().getTime(); //Date.parse(new Date()) / 1000; //添加时间戳
    }
    // const access_token = window.localStorage.getItem(ACCESS_TOKEN);
    // if (access_token && !config.headers["X-Custom-Token"]) {
    //   config.headers["X-Custom-Token"] = `${access_token}`;
    // }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: any) => {
    const res = response.data as IResponseResult;
    const status = res.base_resp;
    // console.log("success response");
    if (status && status.status_code === 401) {
      exit();
    }
    return res as any;
  },
  (error: any) => {
    console.log("error response", error);
    // if (!Object.prototype.hasOwnProperty.call(error, 'status')) {
    //   return Promise.reject(error.message);
    // }
    if (
      error.response != null &&
      Object.prototype.hasOwnProperty.call(error.response, "status") &&
      error.response.status != null &&
      error.response.status == 401
    ) {
      exit();
      return Promise.reject("Authentication is not allowed");
    } else {
      // return Promise.reject(error);
      if (error.response && error.response.data) {
        const errorResp = error.response.data.base_resp;
        return Promise.reject(errorResp.status_message);
      }
      if (error.response && error.response.status == 500) {
        return Promise.reject(error.response.statusText);
      }
    }
  }
);

const exit = () => {};

const servicePromise = (method: string, url: string, data: any, param: any) => {
  return new Promise((resolve, reject) => {
    let config: any = {
      method: method,
      url: url,
      paramsSerializer: {
        serialize: function (params: any) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
    };
    if (method == "get") {
      config.params = param;
    } else {
      config.params = param;
      config.data = data;
    }
    service(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const get = (url: string, data: any, param: any) => {
  return servicePromise("get", url, {}, param);
};
const post = (url: string, data: any, param?: any) => {
  return servicePromise("post", url, data, param);
};
const del = (url: string, data: any, param?: any) => {
  return servicePromise("delete", url, data, param);
};
const put = (url: string, data: any, param?: any) => {
  return servicePromise("put", url, data, param);
};
export { service, get, post, put, del };
