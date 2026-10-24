import Link from "next/link";
import {
  company,
  formatRegisteredAddress,
  isPlaceholder,
  siteConfig,
} from "@/config/site";

export function TermsOfUseContent() {
  const operator = company.legalName;
  const address = formatRegisteredAddress();
  const email = company.email;
  const contactLine = isPlaceholder(email)
    ? "the contact details published on this website once live"
    : email;

  return (
    <article className="prose prose-invert prose-zinc mt-8 max-w-none text-zinc-300">
      <p className="lead text-zinc-400">
        Last updated: 24 October 2026. These terms govern your use of this
        website operated by {operator}. Separate terms apply to waste collection
        services when you accept a quote or booking confirmation.
      </p>

      <h2 className="font-display text-geek-lime">1. About us</h2>
      <ul>
        <li>
          <strong>Operator:</strong> {operator}
        </li>
        <li>
          <strong>Company number:</strong> {company.companyNumber}
        </li>
        <li>
          <strong>Registered address:</strong> {address}
        </li>
        <li>
          <strong>Waste carrier registration:</strong>{" "}
          {company.wasteCarrierLicence} (shown for transparency; confirm active
          registration before booking).
        </li>
        <li>
          <strong>Contact:</strong> {contactLine}
        </li>
      </ul>

      <h2 className="font-display text-geek-lime">2. Using this website</h2>
      <p>
        You may use this site to learn about our services in{" "}
        {siteConfig.serviceAreas.region}, request quotes and contact us. You
        agree not to misuse the site (for example by attempting unauthorised
        access, introducing malware, scraping in a way that harms performance, or
        submitting false or offensive material).
      </p>

      <h2 className="font-display text-geek-lime">3. Quotes and bookings</h2>
      <p>
        Information on this website is for general guidance. A binding contract
        for waste removal is only formed when we confirm a booking in writing
        (including email or text) with agreed price, scope, access requirements
        and date. Estimates from the online form or phone are not guaranteed
        until confirmed.
      </p>
      <p>
        You are responsible for accurate descriptions of waste, access (stairs,
        parking, permits) and disclosure of hazardous or regulated materials we
        cannot legally take. Additional charges may apply if the job differs
        materially from what was agreed.
      </p>

      <h2 className="font-display text-geek-lime">4. Waste and compliance</h2>
      <p>
        We collect and transport waste in line with our carrier registration and
        applicable environmental law. Certain wastes are excluded (including
        asbestos, clinical waste and fuel unless separately agreed). You must
        not conceal prohibited items in mixed loads.
      </p>

      <h2 className="font-display text-geek-lime">5. Intellectual property</h2>
      <p>
        Content on this site (text, branding, images and layout) belongs to us
        or our licensors. You may view and print pages for personal use. You may
        not reproduce our branding or content for commercial purposes without
        permission.
      </p>

      <h2 className="font-display text-geek-lime">6. Third-party links</h2>
      <p>
        Links to council recycling information or other sites are provided for
        convenience. We are not responsible for their content or policies.
      </p>

      <h2 className="font-display text-geek-lime">7. Liability</h2>
      <p>
        Nothing in these terms limits liability for death or personal injury
        caused by negligence, fraud, or any liability that cannot be limited
        under English law. Subject to that, we are not liable for indirect or
        consequential loss arising from use of this website. Website content is
        provided &quot;as is&quot; without warranty of uninterrupted access.
      </p>

      <h2 className="font-display text-geek-lime">8. Privacy and cookies</h2>
      <p>
        Our use of personal data is described in the{" "}
        <Link href="/privacy" className="text-geek-lime hover:underline">
          privacy policy
        </Link>
        . Cookie use is described in the{" "}
        <Link href="/cookies" className="text-geek-lime hover:underline">
          cookie policy
        </Link>
        .
      </p>

      <h2 className="font-display text-geek-lime">9. Governing law</h2>
      <p>
        These terms are governed by the laws of England and Wales. Courts in
        England and Wales have exclusive jurisdiction, without prejudice to your
        statutory rights as a consumer.
      </p>

      <h2 className="font-display text-geek-lime">10. Changes</h2>
      <p>
        We may update these terms. Continued use of the site after changes are
        posted constitutes acceptance of the updated terms where permitted by
        law.
      </p>
    </article>
  );
}
