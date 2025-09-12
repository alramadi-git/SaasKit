import "./../globals.css";

import { ENVIRONMENT } from "@/enums/environment";

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

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations("app.layout"),
    getMessages({ locale }),
  ]);

  return (
    <html suppressHydrationWarning lang={t("lang")} dir={t("dir")}>
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT ||
          process.env.NODE_ENV === ENVIRONMENT.TEST) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
