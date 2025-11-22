"use client";

import { useLocale, useTranslations } from "next-intl";
import { Activity, ComponentProps, Fragment } from "react";

import { LuCheck, LuChevronDown } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { Button } from "@/components/shadcn/button";
import { LocaleSwitch } from "@/components/locals/blocks/link";
import { cn } from "@/utilities/cn";

type tCountry = {
  dir: string;
  locale: string;
  flag: string;
  label: string;
};
type tContinent = {
  label: string;
  countries: tCountry[];
};

type tLanguagesProps = Omit<ComponentProps<typeof Button>, "children"> & {
  align?: ComponentProps<typeof PopoverContent>["align"];
};
export default function Languages({
  align,
  className,
  ...props
}: tLanguagesProps) {
  const locale = useLocale();
  const tLanguages = useTranslations("components.languages");

  const continents: tContinent[] = tLanguages.raw("continents");
  const language = continents
    .find((continent) => {
      return (
        continent.countries.find((country) => country.locale === locale) !==
        undefined
      );
    })!
    .countries.find((country) => country.locale === locale)!;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          className={cn(
            "bg-background hover:bg-background border-input justify-start px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]",
            className,
          )}
          {...props}
        >
          <span className="text-lg leading-none">{language?.flag}</span>
          <span>{language?.label}</span>

          <LuChevronDown
            size={16}
            className="text-muted-foreground/80 ms-auto shrink-0"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] rounded-sm p-0"
      >
        <Command className="rounded-sm">
          <CommandInput placeholder={tLanguages("placeholder")} />

          <CommandList>
            <CommandEmpty>{tLanguages("when-no-result")}</CommandEmpty>

            {continents.map((continent) => (
              <CommandGroup key={continent.label} heading={continent.label}>
                {continent.countries.map((country) => (
                  <Fragment key={country.label}>
                    <Activity
                      mode={
                        country.locale === language.locale
                          ? "hidden"
                          : "visible"
                      }
                    >
                      <CommandItem
                        asChild
                        value={country.label}
                        className="cursor-pointer gap-2.5 rounded-sm"
                      >
                        <LocaleSwitch locale={country.locale}>
                          <span className="text-lg leading-none">
                            {country.flag}
                          </span>

                          <span dir={country.dir} className="line-clamp-1">
                            {country.label}
                          </span>

                          <Activity
                            mode={
                              language?.locale === country.locale
                                ? "visible"
                                : "hidden"
                            }
                          >
                            <LuCheck size={16} className="ml-auto" />
                          </Activity>
                        </LocaleSwitch>
                      </CommandItem>
                    </Activity>
                  </Fragment>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
