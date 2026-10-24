import Link from "next/link";
import {
  company,
  formatRegisteredAddress,
  isPlaceholder,
  siteConfig,
} from "@/config/site";

export function PrivacyPolicyContent() {
  const controller = company.legalName;
  const address = formatRegisteredAddress();
  const email = company.email;
  const phone = company.phone;
  const contactLine = isPlaceholder(email)
    ? "the contact details published on this website once live"
    : `${email}${isPlaceholder(phone) ? "" : ` or ${phone}`}`;

  return (
    <article className="prose prose-invert prose-zinc mt-8 max-w-none text-zinc-300">
      <p className="lead text-zinc-400">
        Last updated: 24 October 2026. This privacy notice explains how{" "}
        {controller} (&quot;we&quot;, &quot;us&quot;) collects and uses personal
        data when you use our website and when you enquire about or book waste
        removal and clearance services.
      </p>

      <h2 className="font-display text-geek-lime">1. Who we are</h2>
      <p>
        {controller} is the data controller for personal data described in this
        notice.
      </p>
      <ul>
        <li>
          <strong>Company number:</strong> {company.companyNumber}
        </li>
        <li>
          <strong>Registered address:</strong> {address}
        </li>
        <li>
          <strong>Contact:</strong> {contactLine}
        </li>
      </ul>

      <h2 className="font-display text-geek-lime">2. What data we collect</h2>
      <p>We may collect and process:</p>
      <ul>
        <li>
          <strong>Identity and contact data</strong> — name, phone number, email
          address, postcode and property access details you provide in quote
          forms, by phone, email or messaging.
        </li>
        <li>
          <strong>Job information</strong> — descriptions of waste or items to
          clear, photos you upload, preferred dates and special instructions.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser type, device
          information and cookies (see our{" "}
          <Link href="/cookies" className="text-geek-lime hover:underline">
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

      <h2 className="font-display text-geek-lime">
        3. How we use your data and lawful bases
      </h2>
      <p>Under UK GDPR we rely on the following lawful bases:</p>
      <ul>
        <li>
          <strong>Contract</strong> — to provide quotes, schedule collections and
          perform waste removal services you request.
        </li>
        <li>
          <strong>Legitimate interests</strong> — to respond to enquiries, improve
          our services, prevent fraud, manage complaints and keep business
          records, balanced against your rights.
        </li>
        <li>
          <strong>Legal obligation</strong> — waste transfer notes, carrier
          records and accounting where the law requires.
        </li>
        <li>
          <strong>Consent</strong> — where you opt in to optional cookies or
          marketing (we do not sell your data).
        </li>
      </ul>

      <h2 className="font-display text-geek-lime">4. Sharing your data</h2>
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

      <h2 className="font-display text-geek-lime">5. International transfers</h2>
      <p>
        Our providers may process data in the UK or EEA. If data is transferred
        outside the UK, we ensure appropriate safeguards (such as UK IDTA or
        adequacy regulations) are in place.
      </p>

      <h2 className="font-display text-geek-lime">6. Retention</h2>
      <p>
        We keep enquiry and job records for as long as needed to provide
        services, handle disputes and meet legal obligations (typically up to six
        years for financial and waste-related records unless a longer period is
        required). Website logs and cookie preferences are kept for shorter
        periods.
      </p>

      <h2 className="font-display text-geek-lime">7. Security</h2>
      <p>
        We use appropriate technical and organisational measures to protect
        personal data. No online transmission is completely secure; please use
        reputable channels when sending photos or access details.
      </p>

      <h2 className="font-display text-geek-lime">8. Your rights</h2>
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
        To exercise rights, contact us using {contactLine}. We may need to
        verify your identity. You also have the right to lodge a complaint with
        the Information Commissioner&apos;s Office (ICO) at{" "}
        <a
          href="https://ico.org.uk"
          className="text-geek-lime hover:underline"
          rel="noopener noreferrer"
        >
          ico.org.uk
        </a>
        .
      </p>

      <h2 className="font-display text-geek-lime">9. Children</h2>
      <p>
        Our services are not directed at children under 16. We do not knowingly
        collect their personal data.
      </p>

      <h2 className="font-display text-geek-lime">10. Changes</h2>
      <p>
        We may update this notice from time to time. The &quot;Last updated&quot;
        date at the top will change when we do. Material changes may also be
        highlighted on the website.
      </p>

      <h2 className="font-display text-geek-lime">11. Service area</h2>
      <p>
        We primarily operate in {siteConfig.serviceAreas.region}. Confirmed town
        and borough lists will be published once coverage is finalised. Your
        postcode helps us confirm coverage before booking.
      </p>
    </article>
  );
}
