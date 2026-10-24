import { company, region, serviceAreas } from "@/config/site";
import { resolveSiteUrl } from "@/lib/env.server";

export function localBusinessJsonLd() {
  const siteUrl = resolveSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.legalName,
    description: company.defaultDescription,
    url: siteUrl,
    telephone: company.phone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address,
      addressLocality: region,
      addressCountry: "GB",
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
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
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
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
