import { tPaginationModel } from "@/models/pagination";

type tSuccessOneModel<tData> = {
  data: tData;
};

type tSuccessManyModel<tData> = {
  data: tData[];
  pagination: tPaginationModel;
};

type tIssueModel = {
  field: string;
  message: string;
};
type tFailedModel = {
  message: string;
  issues: tIssueModel[];
};

type tResponseOneModel<tData> = tSuccessOneModel<tData> | tFailedModel;

type tResponseManyModel<tData> = tSuccessManyModel<tData> | tFailedModel;

export type {
  tSuccessOneModel,
  tSuccessManyModel,
  tIssueModel,
  tFailedModel,
  tResponseOneModel,
  tResponseManyModel,
};
