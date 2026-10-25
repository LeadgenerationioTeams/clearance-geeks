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
  COOKIE_CONSENT_STORAGE_KEY,
} from "@/lib/cookie-consent";
import { company } from "@/config/site";
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
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable} h-full`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(COOKIE_CONSENT_STORAGE_KEY)},v=localStorage.getItem(k);var open=!(v==="granted"||v==="denied");document.documentElement.style.setProperty("--cookie-bar-h",open?"${COOKIE_BAR_HEIGHT_BOOTSTRAP_PX}px":"0px");document.documentElement.setAttribute("data-cookie-banner",open?"open":"closed");}catch(e){document.documentElement.style.setProperty("--cookie-bar-h","0px");document.documentElement.setAttribute("data-cookie-banner","closed");}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-zinc-50 text-zinc-900 antialiased">
        <CookieConsentProvider>
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
