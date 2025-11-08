"use client";

import { z } from "zod";
import { ComponentProps, useState } from "react";

import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";

import { LuMail, LuEye, LuEyeOff } from "react-icons/lu";
import {
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

export type tInputProps = ComponentProps<typeof Input>;
export type tControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

export const zPassword = z
  .string()
  .trim()
  .min(8, { message: "Password must be at least 8" })
  .max(32, { message: "Password must be at most 32" })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  .regex(/^\S+$/, {
    message: "Password must not contain spaces",
  });
type tPassword = z.infer<typeof zPassword>;

export type tFieldPassword = {
  controllerRenderProps: tControllerRenderProps<
    { password: tPassword },
    "password"
  >;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
export function FieldPassword({
  controllerRenderProps,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldPassword) {
  const tPassword = useTranslations("components.fields.password");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        className={cn("pe-9", className)}
        {...controllerRenderProps.field}
        {...inputProps}
      />

      <button
        aria-controls={tPassword("aria-controls")}
        aria-pressed={isVisible}
        aria-label={tPassword("aria-label", {
          isVisible: isVisible ? "true" : "false",
        })}
        className={cn(
          "text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          {
            "text-destructive/80 hover:text-destructive":
              controllerRenderProps.fieldState.invalid,
          },
        )}
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <LuEyeOff size={16} aria-hidden="true" className="aria" />
        ) : (
          <LuEye size={16} aria-hidden="true" className="aria" />
        )}
      </button>
    </div>
  );
}

export const zEmail = z.email().trim();
type tEmail = z.infer<typeof zEmail>;

export type tFieldEmail = {
  controllerRenderProps: tControllerRenderProps<{ email: tEmail }, "email">;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
export function FieldEmail({
  controllerRenderProps,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldEmail) {
  return (
    <div className="relative">
      <Input
        id={id}
        type="email"
        className={cn("peer pe-9", className)}
        {...controllerRenderProps.field}
        {...inputProps}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
        <LuMail size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
