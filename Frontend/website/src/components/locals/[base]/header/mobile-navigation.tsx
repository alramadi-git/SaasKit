import { getTranslations } from "next-intl/server";

import { LuMenu, LuX } from "react-icons/lu";

import Languages from "../../blocks/languages";
import Account from "./account";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/shadcn/sheet";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Container } from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";
import { Link } from "../../blocks/link";
// import { Link } from "@/components/locals/blocks/link";

type tNavigationMenuItem = {
  id: number;
  url: string;
  label: string;
  description: string;
};

export default async function MobileNavigation() {
  const tSettings = await getTranslations("settings");

  const tHeader = await getTranslations("app.layout.header.mobile");
  const tNavigationMenuItems: tNavigationMenuItem[] =
    tHeader.raw("navigation-menu");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <LuMenu className="size-full" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={tSettings("direction") === "ltr" ? "left" : "right"}
        className="w-full"
      >
        <Container className="flex h-full flex-col gap-6 p-4">
          <SheetHeader className="flex flex-row flex-wrap gap-2 p-0">
            <VisuallyHidden>
              <SheetTitle>{tHeader("title")}</SheetTitle>
              <SheetDescription>{tHeader("description")}</SheetDescription>
            </VisuallyHidden>

            <SheetClose asChild>
              <Button variant="outline" className="w-fit">
                <LuX />
              </Button>
            </SheetClose>

            <Languages align="end" className="grow" />
            <Account align="end" />
          </SheetHeader>

          <ul>
            {tNavigationMenuItems.map((item) => (
              <li key={item.id}>
                <Button asChild variant="ghost" className="w-full text-lg">
                  <Link href={item.url}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
