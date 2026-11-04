import {
  company,
  displayLegalName,
  hasCallablePhone,
  hasCompanyEmail,
  serviceAreasListText,
  siteConfig,
} from "@/config/site";
import { resolveSiteUrl } from "@/lib/env.server";

export function GET() {
  const origin = resolveSiteUrl();
  const contactLines = [
    `Quote form: ${origin}/#quote`,
    ...(hasCompanyEmail() ? [`Email: ${siteConfig.company.email}`] : []),
    hasCallablePhone()
      ? `Phone: ${siteConfig.company.phone}`
      : "Phone: not published yet",
  ].join("\n");

  const body = `# ${displayLegalName()}

> ${company.defaultDescription}

## Services
- House clearance
- Garden waste removal
- Office and commercial clearance
- General junk and rubbish removal
- Builders' waste
- Single item collections

## Areas (${siteConfig.serviceAreas.region})
${serviceAreasListText()}.

## Contact
${contactLines}

## Policies
- Privacy: ${origin}/privacy
- Cookies: ${origin}/cookies
- Terms: ${origin}/terms
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
