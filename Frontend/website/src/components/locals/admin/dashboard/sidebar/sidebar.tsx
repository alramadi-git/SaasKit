import { useTranslations } from "next-intl";
import { useAccount } from "@/hooks/admin/use-account";

import {
  LuChevronsUpDown,
  LuSparkles,
  LuBadgeCheck,
  LuCreditCard,
  LuBell,
  LuLogOut,
} from "react-icons/lu";

import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/shadcn/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/shadcn/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";

type tLink = {
  href: string;
  label: string;
};

function SidebarAccount() {
  "use client";
  const tAccount = useTranslations(
    "components.dashboard.sidebar.header.account",
  );
  const account = useAccount();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            asChild
            size="lg"
            className="data-[state=open]:bg-sidebar-accent rounded-sm"
          >
            <DropdownMenuTrigger>
              <Avatar className="size-8 rounded-sm">
                <AvatarImage
                  src={
                    account.account?.avatar?.url ??
                    tAccount("default-avatar.src")
                  }
                  alt={account.account?.username}
                />
                <AvatarFallback className="rounded-sm">
                  {account.account?.username
                    .split(" ")
                    .map((chunk) => chunk.at(0))}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h3 className="truncate font-medium">
                  {account.account?.username}
                </h3>
                <p className="truncate text-xs">{account.account?.email}</p>
              </div>
              <LuChevronsUpDown className="ml-auto size-4" />
            </DropdownMenuTrigger>
          </SidebarMenuButton>
          <DropdownMenuContent
            sideOffset={6}
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) rounded-sm"
          >
            <DropdownMenuLabel className="flex items-center gap-2 p-0 px-1 py-1.5 text-left text-sm font-normal">
              <Avatar className="size-8 rounded-sm">
                <AvatarImage
                  src={account.account?.avatar?.url ?? ""}
                  alt={account.account?.username}
                />
                <AvatarFallback className="rounded-sm">
                  {account.account?.username
                    .split(" ")
                    .map((chunk) => chunk.at(0))}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <h3 className="truncate font-medium">
                  {account.account?.username}
                </h3>
                <p className="truncate text-xs">{account.account?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {[].map((item, index) => (
                <DropdownMenuItem
                  key={index}
                  className="cursor-pointer rounded-sm"
                >
                  <LuBadgeCheck />
                  Account
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer rounded-sm"
            >
              <LuLogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function Newsletter() {
  return (
    <Card className="gap-2 py-4 shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="text-sm">Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <form>
          <div className="grid gap-2.5">
            <SidebarInput type="email" placeholder="Email" />
            <Button
              className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
              size="sm"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function Sidebar() {
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <SidebarAccount />
      </SidebarHeader>

      <SidebarSeparator />
      <SidebarContent>{/* <SidebarContentMain /> */}</SidebarContent>

      <SidebarSeparator />
      <SidebarFooter>
        <Newsletter />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
