"use client";

import { ClsAuthenticationService } from "@/services/admin/authentication";

import { tCredentials, zCredentials } from "@/validations/authentication";
import { zodResolver } from "@hookform/resolvers/zod";

import { useId } from "react";
import { useTranslations } from "next-intl";

import { useForm, Controller } from "react-hook-form";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import {
  FieldGroup,
  FieldSeparator,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/shadcn/field";
import { FieldEmail, FieldPassword } from "@/components/locals/blocks/field";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

type tProvider = {
  name: string;
};
const providersIcons = [FaApple({}), FaGoogle({}), FaMeta({})];

export default function Form() {
  const id = useId();
  const { handleSubmit, control } = useForm<tCredentials>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zCredentials),
  });

  const tForm = useTranslations(
    "app.admin.authentication.login.page.card.content.form",
  );
  const providers = (tForm.raw("providers") as tProvider[]).map(
    (provider, index) => ({
      icon: providersIcons[index],
      ...provider,
    }),
  );

  const authenticationService = new ClsAuthenticationService();

  async function onSubmit(values: tCredentials) {
    const response = await authenticationService.login(values);

    console.log(response);
  }

  function onClick(provider: string) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={control}
          name="email"
          render={(controllerRenderProps) => {
            const { fieldState } = controllerRenderProps;

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={id}>{tForm("email.label")}</FieldLabel>

                <FieldEmail
                  inputProps={{
                    "aria-invalid": fieldState.invalid,
                    id: id,
                    placeholder: tForm("email.placeholder"),
                    autoComplete: "off",
                  }}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  controllerRenderProps={controllerRenderProps}
                />

                {fieldState.error !== undefined && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          render={(controllerRenderProps) => {
            const { fieldState } = controllerRenderProps;

            return (
              <Field data-invalid={fieldState.invalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={id}>
                    {tForm("password.label")}
                  </FieldLabel>

                  <Link
                    href={tForm("password.forgot-your-password.url")}
                    className="text-muted-foreground hover:text-foreground ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {tForm("password.forgot-your-password.label")}
                  </Link>
                </div>

                <FieldPassword
                  inputProps={{
                    id: id,
                    placeholder: tForm("password.placeholder"),
                    autoComplete: "off",
                    "aria-invalid": fieldState.invalid,
                  }}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  controllerRenderProps={controllerRenderProps}
                />

                {fieldState.error !== undefined && (
                  <FieldError>{fieldState.error.message}</FieldError>
                )}
              </Field>
            );
          }}
        />

        <Field>
          <Button type="submit">{tForm("submit")}</Button>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent">
          {tForm("separator")}
        </FieldSeparator>

        <Field className="grid grid-cols-3 gap-6">
          {providers.map((provider, index) => (
            <Button
              key={provider.name}
              variant="outline"
              type="button"
              onClick={() => onClick(provider.name)}
            >
              {providersIcons[index]}
            </Button>
          ))}
        </Field>
      </FieldGroup>
    </form>
  );
}
