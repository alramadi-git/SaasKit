"use client";

import { useTranslations } from "next-intl";
import { useAccount } from "@/hooks/[admin]/use-account";

import {
  LuChevronsUpDown,
  LuUser,
  LuBadgeCheck,
  LuBell,
  LuLogOut,
} from "react-icons/lu";

import {
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenuButton,
} from "@/components/shadcn/sidebar";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/shadcn/dropdown-menu";
import { Link } from "@/components/locals/blocks/link";

type tLink = {
  url: string;
  label: string;
};

const icons = [LuBadgeCheck({}), LuBell({})];

export default function SidebarHeader() {
  return (
    <ShadcnSidebarHeader>
      <SidebarAccount />
    </ShadcnSidebarHeader>
  );
}

function SidebarAccount() {
  const tGlobalAccount = useTranslations("components.account");
  const tAccount = useTranslations(
    "app.admin.dashboard.layout.sidebar.header.account",
  );

  const navigationMenu: tLink[] = tAccount.raw("navigation-menu");

  const { account } = useAccount();
  if (account === null) return "hi world";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-sm">
            <AvatarImage src={account.avatar?.url} alt={account.username} />
            <AvatarFallback className="rounded-sm">
              <LuUser size={16} />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{account.username}</span>
            <span className="truncate text-xs">{account.email}</span>
          </div>
          <LuChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={6}
        side="bottom"
        className="bg-sidebar w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-sm border p-1"
      >
        <DropdownMenuLabel>
          <p className="truncate font-medium">{account.username}</p>
          <p className="truncate text-xs font-normal">{account.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navigationMenu.map((item, index) => (
            <DropdownMenuItem asChild key={index} className="rounded-sm">
              <Link href={item.url} className="w-full">
                {icons[index]}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild variant="destructive" className="rounded-sm">
          <button className="w-full">
            <LuLogOut />
            {tGlobalAccount("logout")}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
