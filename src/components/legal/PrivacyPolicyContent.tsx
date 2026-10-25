import Link from "next/link";
import {
  company,
  formatRegisteredAddress,
  isPlaceholder,
  serviceAreaNames,
  siteConfig,
} from "@/config/site";
import { cn } from "@/lib/cn";
import {
  legalArticleClass,
  legalHeadingClass,
  legalLinkClass,
  lvCn,
} from "@/lib/light-van-page-theme";

export function PrivacyPolicyContent() {
  const address = formatRegisteredAddress();
  const email = company.email;
  const phone = company.phone;
  const ico = siteConfig.compliance.icoRegistrationNumber;
  const retentionUnconverted = siteConfig.compliance.quoteRetentionIfNotBooked;

  const contactLine = isPlaceholder(email)
    ? "the contact details published on this website once live"
    : email;

  const dpoLine = isPlaceholder(email)
    ? "We have not appointed a data protection officer; contact us using the contact details published on this website once live."
    : `We have not appointed a data protection officer; contact us at ${email}.`;

  return (
    <article className={legalArticleClass()}>
      <p className={cn("lead", lvCn("text-zinc-600", "text-zinc-400"))}>
        Last updated: 24 October 2026. This privacy notice explains how we
        collect and use personal data when you use our website and when you
        enquire about or book waste removal and clearance services.
      </p>

      <h2 className={legalHeadingClass()}>1. Who we are</h2>
      <p>
        {company.legalName} (company number {company.companyNumber}, registered
        office {address}), trading as {company.name}, is the controller. ICO
        registration: {ico}.
      </p>
      <ul>
        <li>
          <strong>Contact:</strong> {contactLine}
          {isPlaceholder(phone) ? null : ` · ${phone}`}
        </li>
        <li>{dpoLine}</li>
      </ul>

      <h2 className={legalHeadingClass()}>2. What data we collect</h2>
      <p>We may collect and process:</p>
      <ul>
        <li>
          <strong>Identity and contact data</strong> — name, phone number, email
          address, postcode and property access details you provide in quote
          forms, by phone, email or messaging.
        </li>
        <li>
          <strong>Job information</strong> — descriptions of waste or items to
          clear, photos you send us after we reply, preferred dates and special
          instructions.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type, device
          information and cookies (see our{" "}
          <Link href="/cookies" className={legalLinkClass()}>
            cookie policy
          </Link>
          ).
        </li>
        <li>
          <strong>Communications</strong> — records of calls, emails and messages
          relating to quotes and bookings.
        </li>
      </ul>
      <p>
        We do not routinely collect special category data. If sensitive
        circumstances apply (for example bereavement clearances), please only
        share what is necessary for the job.
      </p>

      <h2 className={legalHeadingClass()}>
        3. How we use your data and lawful bases
      </h2>
      <p>Under UK GDPR we rely on the following lawful bases:</p>
      <ul>
        <li>
          <strong>Contract</strong> — to provide quotes, schedule collections and
          perform waste removal services you request.
        </li>
        <li>
          <strong>Legitimate interests</strong> — our interest in responding to
          enquiries and running our business, balanced against your rights.
        </li>
        <li>
          <strong>Legal obligation</strong> — waste transfer notes, carrier
          records and accounting where the law requires.
        </li>
        <li>
          <strong>Consent</strong> — where you opt in to optional cookies (we do
          not sell your data).
        </li>
      </ul>

      <h2 className={legalHeadingClass()}>4. Sharing your data</h2>
      <p>
        Online quote requests aren&apos;t open yet, so we don&apos;t keep anything
        you type into the form. When online quoting is live, recipients will be:{" "}
        {siteConfig.compliance.leadRecipient}.
      </p>
      <p>We may share personal data with:</p>
      <ul>
        <li>
          Service providers who host our website, store backups or help us operate
          email and CRM systems (processors under contract).
        </li>
        <li>
          Licensed waste disposal and recycling facilities, and regulators, where
          required for lawful waste transfer and compliance.
        </li>
        <li>
          Professional advisers (for example insurers or accountants) where
          necessary.
        </li>
        <li>
          Law enforcement or courts when required by law or to protect rights and
          safety.
        </li>
      </ul>
      <p>We do not sell your personal data.</p>

      <h2 className={legalHeadingClass()}>5. International transfers</h2>
      <p>
        Our providers may process data in the UK or EEA. If data is transferred
        outside the UK, we ensure appropriate safeguards (such as UK IDTA or
        adequacy regulations) are in place.
      </p>

      <h2 className={legalHeadingClass()}>6. Retention</h2>
      <p>
        We keep enquiry and job records for as long as needed to provide
        services, handle disputes and meet legal obligations (typically up to six
        years for financial and waste-related records unless a longer period is
        required). Website logs and cookie preferences are kept for shorter
        periods.
      </p>
      <p>
        If you don&apos;t book, we delete your quote request after{" "}
        {retentionUnconverted}.
      </p>

      <h2 className={legalHeadingClass()}>7. Security</h2>
      <p>
        We use appropriate technical and organisational measures to protect
        personal data. No online transmission is completely secure; please use
        reputable channels when sending photos or access details.
      </p>

      <h2 className={legalHeadingClass()}>8. Your rights</h2>
      <p>Under UK data protection law you may have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request erasure in certain circumstances.</li>
        <li>Restrict or object to processing in certain circumstances.</li>
        <li>Data portability where processing is automated and based on contract or consent.</li>
        <li>Withdraw consent where processing is based on consent.</li>
      </ul>
      <p>
        You can object at any time to us using your data on the basis of
        legitimate interests.
      </p>
      <p>
        To exercise rights, contact us using {contactLine}. We may need to
        verify your identity. You also have the right to lodge a complaint with
        the Information Commissioner&apos;s Office (ICO) at{" "}
        <a
          href="https://ico.org.uk"
          className={legalLinkClass()}
          rel="noopener noreferrer"
        >
          ico.org.uk
        </a>{" "}
        or by calling 0303 123 1113.
      </p>

      <h2 className={legalHeadingClass()}>9. Children</h2>
      <p>
        Our services are not directed at children under 16. We do not knowingly
        collect their personal data.
      </p>

      <h2 className={legalHeadingClass()}>10. Changes</h2>
      <p>
        We may update this notice from time to time. The &quot;Last updated&quot;
        date at the top will change when we do. Material changes may also be
        highlighted on the website.
      </p>

      <h2 className={legalHeadingClass()}>11. Service area</h2>
      <p>
        We primarily operate in {siteConfig.serviceAreas.region} (
        {serviceAreaNames().slice(0, 4).join(", ")} and
        surrounding areas). Your postcode helps us confirm coverage before
        booking.
      </p>
    </article>
  );
}
