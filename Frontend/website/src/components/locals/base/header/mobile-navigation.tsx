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
// import { Link } from "@/components/locals/blocks/link";

// type tNavigationMenuItem = {
//   id: number;
//   href: string;
//   label: string;
//   description: string;
// };

export default async function MobileNavigation() {
  const tSettings = await getTranslations("settings");

  // const tHeader = await getTranslations("app.layout.header");
  // const tNavigationMenuItems: tNavigationMenuItem[] = tHeader.raw(
  //   "mobile-navigation-menu",
  // );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <LuMenu className="size-full" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={tSettings("dir") === "ltr" ? "left" : "right"}
        className="w-full"
      >
        <Container className="flex h-full flex-col gap-4 p-4">
          <SheetHeader className="flex flex-row gap-2 p-0">
            <VisuallyHidden>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </SheetDescription>
            </VisuallyHidden>

            <SheetClose asChild>
              <Button variant="outline" className="w-fit">
                <LuX />
              </Button>
            </SheetClose>

            <Languages align="start" />
            <Account align="start" />
          </SheetHeader>
        </Container>
      </SheetContent>
    </Sheet>
  );
}
