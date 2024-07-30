export interface IResponseResult {
    base_resp: {
      status_code: number;
      status_message: string;
    };
    errorMessage:string;
    id?: string;
    data?: any;
    accesstoken?: string;
    refreshtoken?: string;
  }
  