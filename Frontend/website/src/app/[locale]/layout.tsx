import "./../globals.css";

import { eEnvironment } from "@/enums/environment";

import { Cairo } from "next/font/google";
import { getTranslations, getMessages } from "next-intl/server";
import { cn } from "@/utilities/cn";

import ThemeProvider from "@/components/locals/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "@/components/shadcn/sonner";

import Script from "next/script";

export const dynamic = "force-static";

const cairo = Cairo({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  const [tSettings, messages] = await Promise.all([
    getTranslations("settings"),
    getMessages(),
  ]);

  return (
    <html
      suppressHydrationWarning
      lang={tSettings("language")}
      dir={tSettings("direction")}
    >
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster
              position={
                tSettings("direction") === "ltr" ? "top-right" : "top-left"
              }
            />
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
