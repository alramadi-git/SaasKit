"use client";

import { ComponentProps } from "react";

import { useTranslations } from "next-intl";
import { useAccount } from "@/hooks/[base]/use-account";

import { LuBolt } from "react-icons/lu";

import BlockAccount from "../../blocks/account";

import { DropdownMenuContent } from "@/components/shadcn/dropdown-menu";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";

type tNavigationMenuItem = {
  url: string;
  label: string;
};

type tAccountProps = {
  align?: ComponentProps<typeof DropdownMenuContent>["align"];
};

const icons = [[LuBolt({})]];

export default function Account({ align }: tAccountProps) {
  const { account, logout } = useAccount();
  const tAccount = useTranslations("app.layout.header.account");

  if (account === null) {
    return (
      <BlockAccount
        isAuthenticated={false}
        unauthenticatedReactNode={
          <Button asChild variant="outline" className="max-md:grow">
            <Link href="/authentication/login">
              {tAccount("unauthenticated.label")}
            </Link>
          </Button>
        }
      />
    );
  }

  const navigationMenu = (
    tAccount.raw("authenticated.navigation-menu") as tNavigationMenuItem[][]
  ).map((group, groupIndex) =>
    group.map((item, index) => ({
      icon: icons[groupIndex][index],
      url: item.url,
      label: item.label,
    })),
  );

  return (
    <BlockAccount
      isAuthenticated={true}
      authenticated={{
        account,
        logout,
        navigationMenu,
        props: {
          align,
        },
      }}
    />
  );
}
