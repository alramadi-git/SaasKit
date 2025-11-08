import { tPaginationModel } from "@/models/pagination";

type tService = {
  statusCode: number;
  statusText: string;
};

export type tSuccessOneService<tData> = tService & {
  isSuccess: true;

  data: tData;
};

export type tSuccessManyService<tData> = tService & {
  isSuccess: true;

  data: tData[];
  pagination: tPaginationModel;
};

export type tIssueService = {
  field: string;
  message: string;
};
export type tFailedService = tService & {
  isSuccess: false;

  message: string;
  issues: tIssueService[];
};

export type tResponseOneService<tData> =
  | tSuccessOneService<tData>
  | tFailedService;

export type tResponseManyService<tData> =
  | tSuccessManyService<tData>
  | tFailedService;
