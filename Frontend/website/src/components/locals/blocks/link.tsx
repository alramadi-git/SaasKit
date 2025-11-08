"use client";

import { ComponentProps } from "react";

import { useSearchParams } from "next/navigation";
import { usePathname, Link as ShadcnLink } from "@/i18n/navigation";

export function Link(props: ComponentProps<typeof ShadcnLink>) {
  return <ShadcnLink {...props} />;
}

export function LocaleSwitch(
  props: Omit<ComponentProps<typeof Link>, "href">,
) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = `${pathname}${searchParams.size === 0 ? "" : "?"}${searchParams.toString()}`;
  return <Link href={href} {...props} />;
}
