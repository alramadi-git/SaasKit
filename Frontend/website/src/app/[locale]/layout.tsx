import "./../globals.css";
import type { Metadata } from "next";

import { eEnvironment } from "@/enums/environment";

import { Cairo } from "next/font/google";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { cn } from "@/utilities/cn";

import ThemeProvider from "@/components/locals/providers/theme-provider";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/shadcn/sonner";
import { Container } from "@/components/locals/blocks/typography";

const cairo = Cairo({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const dynamic = "force-static";
export async function generateMetadata({}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const tLayout = await getTranslations("app.layout");
  const tMetadata: Metadata = tLayout.raw("metadata");

  return tMetadata;
}
export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tSettings, messages] = await Promise.all([
    getTranslations("settings"),
    getMessages({ locale }),
  ]);

  return (
    <html
      suppressHydrationWarning
      lang={tSettings("lang")}
      dir={tSettings("dir")}
    >
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Container className="relative">
              <Toaster
                position={tSettings("dir") === "ltr" ? "top-right" : "top-left"}
              />
            </Container>
          </NextIntlClientProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === eEnvironment.development ||
          process.env.NODE_ENV === eEnvironment.test) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
