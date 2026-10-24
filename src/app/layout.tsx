import type { Metadata } from "next";
import { Bangers, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsentProvider } from "@/components/CookieConsent";
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
    default: company.legalName,
    template: `%s | ${company.legalName}`,
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
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 antialiased">
        <CookieConsentProvider>
          <JsonLd data={localBusinessJsonLd()} />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
