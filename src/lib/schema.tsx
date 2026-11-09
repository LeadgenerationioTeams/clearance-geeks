import {
  company,
  hasCompanyEmail,
  hasConfiguredValue,
  hasRegisteredAddress,
  isPlaceholder,
  siteConfig,
} from "@/config/site";
import { resolveSiteUrl } from "@/lib/env.server";

export function localBusinessJsonLd() {
  const siteUrl = resolveSiteUrl();
  const addr = siteConfig.company.registeredAddress;
  const isUrlPlaceholder = isPlaceholder(siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.legalName,
    description: company.defaultDescription,
    ...(isUrlPlaceholder ? {} : { url: siteUrl }),
    ...(hasConfiguredValue(siteConfig.company.phone)
      ? { telephone: siteConfig.company.phone }
      : {}),
    ...(hasCompanyEmail() ? { email: siteConfig.company.email } : {}),
    ...(hasRegisteredAddress()
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: [addr.line1, addr.line2]
              .filter((line) => hasConfiguredValue(line))
              .join(", "),
            ...(hasConfiguredValue(addr.city)
              ? { addressLocality: addr.city }
              : {}),
            ...(hasConfiguredValue(addr.postcode)
              ? { postalCode: addr.postcode }
              : {}),
            addressCountry: "GB",
          },
        }
      : {}),
    areaServed: {
      "@type": "AdministrativeArea",
      name: siteConfig.serviceAreas.region,
    },
  };
}

export function serviceJsonLd(params: {
  name: string;
  description: string;
  areaName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: params.name,
    description: params.description,
    provider: {
      "@type": "LocalBusiness",
      name: company.legalName,
    },
    areaServed: {
      "@type": "City",
      name: params.areaName,
    },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  const siteUrl = resolveSiteUrl();
  const isUrlPlaceholder = isPlaceholder(siteUrl);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(isUrlPlaceholder ? {} : { item: `${siteUrl}${item.path}` }),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
