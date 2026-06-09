export interface LegalResult {
  id: number;
  title: string;
  summary: string;
}

export interface ResponseMeta {
  page: number;
  limit: number;
  totalData: number;
  totalPage: number;
}

export interface GenerateResponse {
  status: number;
  success: boolean;
  message: string;
  meta: ResponseMeta;
  data: LegalResult[];
}

export interface GenerateErrorResponse {
  success: false;
  message: string;
}

export type RequestStatus = "idle" | "loading" | "success" | "error";
