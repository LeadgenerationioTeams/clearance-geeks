import {
  brandName,
  company,
  complianceCopy,
  formatServiceAreasCommaList,
  region,
} from "@/config/site";
import { LegalSection } from "./LegalDocument";

export function TermsOfUseContent() {
  const lastUpdated = "24 October 2026";

  return (
    <div>
      <p className="text-sm text-zinc-500">Last updated: {lastUpdated}</p>
      <p className="mt-4 text-sm leading-relaxed text-zinc-600">
        These terms govern your use of the {brandName} website operated by{" "}
        {company.legalName} (&quot;we&quot;, &quot;us&quot;). By using this site you agree to
        these terms. If you do not agree, please do not use the site.
      </p>

      <LegalSection title="1. About us">
        <p>
          {company.legalName} (company number {company.companyNumber}) is registered in
          England and Wales with registered office at {company.address}. We provide waste
          removal and clearance services in {region}, including{" "}
          {formatServiceAreasCommaList()}.
        </p>
        <p>
          Contact: {company.email} or {company.phone}.
        </p>
      </LegalSection>

      <LegalSection title="2. Website only — not a contract for services">
        <p>
          Information on this website is for general guidance. It does not form a binding
          contract until we confirm a booking in writing (including email or text) with agreed
          price, access details and collection window. {complianceCopy.quoteDisclaimer}
        </p>
      </LegalSection>

      <LegalSection title="3. Waste services">
        <p>
          Collections are subject to safe access, parking, and the waste types we can legally
          carry. {complianceCopy.wasteCarrierNote} {complianceCopy.recyclingNote}
        </p>
        <p>
          Hazardous waste (including asbestos, clinical waste, fuel and certain chemicals) is
          excluded unless expressly agreed in writing with appropriate licensing.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the site unlawfully or in a way that could harm the site or others.</li>
          <li>Submit false, misleading or offensive information through our forms.</li>
          <li>Attempt to gain unauthorised access to our systems or scrape the site excessively.</li>
          <li>Use our branding or content without permission.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Intellectual property">
        <p>
          We own or license the content on this website (text, logos, images and layout). You
          may view and print pages for personal use related to obtaining our services. You must
          not reproduce content for commercial purposes without our written consent.
        </p>
      </LegalSection>

      <LegalSection title="6. Third-party links">
        <p>
          Links to council recycling centres or other third-party sites are provided for
          reference. We are not responsible for their content or policies.
        </p>
      </LegalSection>

      <LegalSection title="7. Liability">
        <p>
          Nothing in these terms excludes liability for death or personal injury caused by our
          negligence, fraud, or any other liability that cannot be excluded under English law.
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for loss of profit, loss of
          data, or indirect loss arising from use of the website. Our total liability arising
          from your use of the site is limited to £100 except where a collection contract
          applies separate terms with different limits.
        </p>
        <p>
          The website is provided &quot;as is&quot;. We do not guarantee uninterrupted or
          error-free operation.
        </p>
      </LegalSection>

      <LegalSection title="8. Privacy and cookies">
        <p>
          Our use of personal data is described in the{" "}
          <a href="/privacy" className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4">
            privacy policy
          </a>
          . Cookies are explained in the{" "}
          <a href="/cookies" className="font-medium text-geek-charcoal underline decoration-geek-lime decoration-2 underline-offset-4">
            cookie policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="9. Changes">
        <p>
          We may update these terms. The &quot;Last updated&quot; date will change when we do.
          Continued use of the site after changes constitutes acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Governing law">
        <p>
          These terms are governed by the laws of England and Wales. The courts of England and
          Wales have exclusive jurisdiction, except that consumers resident in Scotland or
          Northern Ireland may also have local rights.
        </p>
      </LegalSection>
    </div>
  );
}
