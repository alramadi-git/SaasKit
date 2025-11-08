import { Fragment } from "react";
import Header from "@/components/locals/base/header/header";

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  );
}
