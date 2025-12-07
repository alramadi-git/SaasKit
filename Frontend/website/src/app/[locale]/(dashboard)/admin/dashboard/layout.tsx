import type { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { SidebarProvider, SidebarInset } from "@/components/shadcn/sidebar";
import Sidebar from "@/components/locals/[admin]/dashboard/sidebar/sidebar";

import Header from "@/app/[locale]/(dashboard)/admin/dashboard/_components/uis/header/header";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.admin.dashboard.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]/admin/dashboard">) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
