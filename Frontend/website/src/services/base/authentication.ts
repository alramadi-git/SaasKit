import { tCredentials } from "@/validations/authentication";

import { tAccountModel } from "@/models/account";
import { tUserModel } from "@/models/base/user";
import { tSuccessOneModel, tFailedModel } from "@/models/response";
import { tSuccessOneService, tResponseOneService } from "../response";

import { ClsAbstractService, ClsErrorService } from "../service";

export class ClsAuthenticationService extends ClsAbstractService {
  public constructor() {
    super("/authentication");
  }

  protected async _login(
    credentials: tCredentials,
  ): Promise<tSuccessOneService<tAccountModel<tUserModel>>> {
    const response: Response = await fetch(`${this._apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const responseBody: tFailedModel = await response.json();

      throw new ClsErrorService(
        responseBody.message,
        response.status,
        response.statusText,
        responseBody.issues,
      );
    }

    const responseBody: tSuccessOneModel<tAccountModel<tUserModel>> =
      await response.json();
    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
    };
  }

  public async login(
    credentials: tCredentials,
  ): Promise<tResponseOneService<tAccountModel<tUserModel>>> {
    return await this.catcher(async () => await this._login(credentials));
  }
}
