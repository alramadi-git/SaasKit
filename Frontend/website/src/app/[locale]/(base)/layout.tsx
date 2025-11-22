import { Metadata } from "next";

import { getTranslations } from "next-intl/server";

import { Fragment } from "react";
import Header from "@/components/locals/[base]/header/header";
import Footer from "@/components/locals/[base]/footer/footer";

export const dynamic = "force-static";
export async function generateMetadata({}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const tLayout = await getTranslations("app.layout");

  const tMetadata: Metadata = tLayout.raw("metadata");
  return tMetadata;
}

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
