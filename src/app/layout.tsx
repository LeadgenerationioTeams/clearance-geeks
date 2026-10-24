import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsentProvider } from "@/components/CookieConsent";
import { brandName, company } from "@/config/site";
import { JsonLd, localBusinessJsonLd } from "@/lib/schema";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: brandName,
    template: `%s | ${brandName}`,
  },
  description: company.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${body.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-zinc-100 text-geek-charcoal antialiased">
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
