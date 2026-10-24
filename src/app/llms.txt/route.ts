import {
  brandName,
  company,
  formatServiceAreasCommaList,
  servicesListed,
} from "@/config/site";

export function GET() {
  const body = `# ${brandName} - Waste Removals

> ${company.defaultDescription}

## Services
${servicesListed.map((s) => `- ${s}`).join("\n")}

## Areas
${formatServiceAreasCommaList()}.

## Contact
Phone: ${company.phone}
Email: ${company.email}
Quote form: use the homepage form once the site is live.

## Policies
- Privacy: /privacy
- Cookies: /cookies
- Terms: /terms
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
