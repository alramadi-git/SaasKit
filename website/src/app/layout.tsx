import "./globals.css";

import { ENVIRONMENT } from "@/enums/environment";

import { Cairo } from "next/font/google";
import { cn } from "@/utilities/cn";

import ThemeProvider from "@/components/locals/providers/theme-provider";
import Script from "next/script";

const cairo = Cairo({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
        >
          {children}
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
