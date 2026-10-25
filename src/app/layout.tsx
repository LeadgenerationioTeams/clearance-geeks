import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { CookieConsentProvider } from "@/components/CookieConsent";
import { QuoteHashFocus } from "@/components/QuoteHashFocus";
import {
  COOKIE_BAR_HEIGHT_BOOTSTRAP_PX,
  COOKIE_BAR_HEIGHT_COMPACT_BOOTSTRAP_PX,
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";
import { company } from "@/config/site";
import { cn } from "@/lib/cn";
import { isLightVanExperience } from "@/lib/home-hero";
import { JsonLd, localBusinessJsonLd } from "@/lib/schema";

const display = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: company.name,
    template: `%s | ${company.name}`,
  },
  description: company.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lightVan = isLightVanExperience();

  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${body.variable} h-full`}
      data-home-hero={lightVan ? "light-van" : "default"}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(COOKIE_CONSENT_STORAGE_KEY)},v=localStorage.getItem(k);var open=!(v==="granted"||v==="denied");var compact=${JSON.stringify(lightVan)}&&window.matchMedia("(max-width:1023px)").matches;var h=open?(compact?${COOKIE_BAR_HEIGHT_COMPACT_BOOTSTRAP_PX}:${COOKIE_BAR_HEIGHT_BOOTSTRAP_PX}):0;document.documentElement.style.setProperty("--cookie-bar-h",h+"px");document.documentElement.setAttribute("data-cookie-banner",open?"open":"closed");}catch(e){document.documentElement.style.setProperty("--cookie-bar-h","0px");document.documentElement.setAttribute("data-cookie-banner","closed");}})();`,
          }}
        />
      </head>
      <body
        className={cn(
          "flex min-h-full flex-col text-zinc-900 antialiased",
          lightVan ? "bg-[#F7F8F6]" : "bg-zinc-50",
        )}
      >
        <CookieConsentProvider compactMobile={lightVan}>
          <QuoteHashFocus />
          <JsonLd data={localBusinessJsonLd()} />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <StickyMobileCta />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
