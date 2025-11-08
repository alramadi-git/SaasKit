"use client";

import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";

import { useId } from "react";
import { useTranslations } from "next-intl";

import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import {
  FieldGroup,
  FieldSeparator,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/shadcn/field";

import {
  zEmail,
  FieldEmail,
  zPassword,
  FieldPassword,
} from "@/components/locals/blocks/field";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

const providersIcons = [FaApple, FaGoogle, FaMeta];

const zPersonalInfo = z.object({
  email: zEmail,
  password: zPassword,
});
type tPersonalInfo = z.infer<typeof zPersonalInfo>;

export default function Form() {
  const id = useId();
  const { handleSubmit, control } = useForm<tPersonalInfo>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(zPersonalInfo),
  });

  const tForm = useTranslations("app.authentication.login.page.form");
  const providers = (
    tForm.raw("providers") as {
      label: string;
    }[]
  ).map((provider, index) => ({
    icon: providersIcons[index],
    ...provider,
  }));

  function onSubmit(values: tPersonalInfo) {
    console.log(values);
  }

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
                <FieldDescription>{fieldState.error?.message}</FieldDescription>
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
                    href={tForm("password.forgot-your-password.href")}
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
                <FieldDescription>{fieldState.error?.message}</FieldDescription>
              </Field>
            );
          }}
        />

        <Field>
          <Button type="submit">{tForm("submit")}</Button>
          <FieldDescription>
            {tForm.rich("register.label", {
              link: (chunk) => (
                <Link href={tForm("register.href")}>{chunk}</Link>
              ),
            })}
          </FieldDescription>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-transparent">
          {tForm("separator")}
        </FieldSeparator>

        <Field className="grid grid-cols-3 gap-6">
          {providers.map((provider) => (
            <Button key={provider.label} variant="outline" type="button">
              <provider.icon />
            </Button>
          ))}
        </Field>

        <FieldDescription className="w-3/4">
          {tForm.rich("terms-and-conditions", {
            termsLink: (chunk) => <Link href="/terms-of-use">{chunk}</Link>,
            PrivacyLink: (chunk) => <Link href="/privacy-policy">{chunk}</Link>,
          })}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
