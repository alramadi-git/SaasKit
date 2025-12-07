import { tPaginationModel } from "@/models/pagination";

type tService = {
  statusCode: number;
  statusText: string;
};

type tSuccessOneService<tData> = tService & {
  isSuccess: true;
  data: tData;
};

type tSuccessManyService<tData> = tService & {
  isSuccess: true;
  data: tData[];
  pagination: tPaginationModel;
};

type tIssueService = {
  field: string;
  message: string;
};
type tFailedService = tService & {
  isSuccess: false;
  message: string;
  issues: tIssueService[];
};

type tResponseOneService<tData> = tSuccessOneService<tData> | tFailedService;

type tResponseManyService<tData> = tSuccessManyService<tData> | tFailedService;

export type {
  tSuccessOneService,
  tSuccessManyService,
  tIssueService,
  tFailedService,
  tResponseOneService,
  tResponseManyService,
};
