import { ComponentProps, ReactNode } from "react";
import { cn } from "@/utilities/cn";

export const sectionClassName: string = "px-8 py-16 lg:px-12 lg:py-24";
export function Section({
  className,
  ...props
}: ComponentProps<"section">): ReactNode {
  return <section className={cn(sectionClassName, className)} {...props} />;
}

export const containerClassName: string = "container mx-auto";
export function Container({
  className,
  ...props
}: ComponentProps<"div">): ReactNode {
  return <div className={cn(containerClassName, className)} {...props} />;
}

export function Kbd({
  className,
  ...props
}: Omit<ComponentProps<"kbd">, "dir">): ReactNode {
  return (
    <kbd
      dir="ltr"
      className={cn(
        "text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium",
        className,
      )}
      {...props}
    />
  );
}

export function Blockquote({
  className,
  children,
  ...props
}: ComponentProps<"blockquote">): ReactNode {
  return (
    <blockquote className={cn("border-s-2 ps-6 italic", className)} {...props}>
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}
