"use client";

import { ComponentProps } from "react";

// eslint-disable-next-line no-restricted-imports
import { usePathname, Link as ShadcnLink } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export function Link(props: ComponentProps<typeof ShadcnLink>) {
  return <ShadcnLink {...props} />;
}

export function LocaleSwitch(props: Omit<ComponentProps<typeof Link>, "href">) {
  const pathname = usePathname();

  let searchParams = useSearchParams().toString();
  searchParams = searchParams && `?${searchParams}`;

  return <Link href={`${pathname}${searchParams}`} {...props} />;
}
