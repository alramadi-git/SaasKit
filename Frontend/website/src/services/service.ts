import { ZodError } from "zod";
import {
  tSuccessOneService,
  tSuccessManyService,
  tFailedService,
} from "./response";

export class ClsErrorService extends Error {
  public statusCode: tFailedService["statusCode"];
  public statusText: tFailedService["statusText"];
  public issues: tFailedService["issues"];

  constructor(
    message: tFailedService["message"],
    statusCode: tFailedService["statusCode"],
    statusText: tFailedService["statusText"],
  );
  constructor(
    message: tFailedService["message"],
    statusCode: tFailedService["statusCode"],
    statusText: tFailedService["statusText"],
    issues: tFailedService["issues"],
  );

  constructor(
    message: tFailedService["message"],
    statusCode: tFailedService["statusCode"],
    statusText: tFailedService["statusText"],
    issues: tFailedService["issues"] = [],
  ) {
    super(message);

    this.statusCode = statusCode;
    this.statusText = statusText;

    this.issues = issues;
  }

  toJSON(): tFailedService {
    return {
      isSuccess: false,
      statusCode: this.statusCode,
      statusText: this.statusText,
      message: this.message,
      issues: this.issues,
    };
  }
}

export abstract class ClsAbstractService {
  protected readonly _apiUrl: string;

  protected constructor(path: string) {
    this._apiUrl = `${process.env.NEXT_PUBLIC_API_URL!}${path}`;
  }

  protected async catcher<
    tData,
    tReturn extends tSuccessManyService<tData> | tSuccessOneService<tData>,
  >(callback: () => Promise<tReturn>): Promise<tFailedService | tReturn> {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof ZodError)
        return {
          isSuccess: false,
          statusCode: 400,
          statusText: "Bad Request",
          message: error.message,
          issues: error.issues.map((issue) => ({
            field: issue.path[0].toString(),
            message: issue.message,
          })),
        } satisfies tFailedService;

      if (error instanceof ClsErrorService) return error.toJSON();

      if (error instanceof Error)
        return {
          isSuccess: false,
          statusCode: 500,
          statusText: "Internal Server Error",
          message: error.message,
          issues: [],
        } satisfies tFailedService;

      return {
        isSuccess: false,
        statusCode: 500,
        statusText: "Internal Server Error",
        message: "Something went wrong",
        issues: [],
      } satisfies tFailedService;
    }
  }
}
