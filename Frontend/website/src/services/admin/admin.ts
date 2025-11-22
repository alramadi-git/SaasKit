import { tCredentials, tEmail } from "@/validations/authentication";

import { tAccountModel } from "@/models/account";
import { tAdminModel } from "@/models/[admin]/admin";
import { tSuccessOneModel, tFailedModel } from "@/models/response";
import { tSuccessOneService, tResponseOneService } from "../response";

import { ClsAbstractService, ClsErrorService } from "../service";

class ClsAdmin extends ClsAbstractService {
  public constructor() {
    super("/admin");
  }

  protected async _SubscribeToNewsletter(
    email: tEmail,
  ): Promise<tSuccessOneService<tAccountModel<tAdminModel>>> {
    const response: Response = await fetch(`${this._apiUrl}/newsletter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(email),
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

    const responseBody: tSuccessOneModel<tAccountModel<tAdminModel>> =
      await response.json();

    return {
      isSuccess: true,
      statusCode: response.status,
      statusText: response.statusText,
      data: responseBody.data,
    };
  }

  public async SubscribeToNewsletter(
    email: tEmail,
  ): Promise<tResponseOneService<tAccountModel<tAdminModel>>> {
    return await this.catcher(
      async () => await this._SubscribeToNewsletter(email),
    );
  }
}

export { ClsAdmin as ClsAuthenticationService };
