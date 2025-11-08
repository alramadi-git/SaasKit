import { tPaginationModel } from "@/models/pagination";

export type tSuccessOneModel<tData> =  {
  data: tData;
};

export type tSuccessManyModel<tData> =  {
  data: tData[];
  pagination: tPaginationModel;
};

export type tIssueModel = {
  field: string;
  message: string;
};
export type tFailedModel =  {
  message: string;
  issues: tIssueModel[];
};

export type tResponseOneModel<tData> =
  | tSuccessOneModel<tData>
  | tFailedModel;

export type tResponseManyModel<tData> =
  | tSuccessManyModel<tData>
  | tFailedModel;
