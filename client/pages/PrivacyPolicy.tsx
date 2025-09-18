const LAST_UPDATED = "29 July 2025";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Privacy policy</p>
          <h1 className="font-serif text-4xl md:text-5xl">Brieflee.be – Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: {LAST_UPDATED}</p>
          <p className="text-muted-foreground">
            BZ Trade BV ("BZ Trade", "we", "our"), a Belgian limited liability company with its registered seat at Charlottalei 58, 2018 Antwerp,
            operates the online platform Brieflee.be (the "Service"). BZ Trade acts as Data Controller for the personal data described in this policy.
            Contact us at <a className="text-primary underline" href="mailto:support@brieflee.be">support@brieflee.be</a>.
          </p>
        </div>
      </section>

      <section className="container pb-24 md:pb-40">
        <div className="mx-auto max-w-3xl space-y-16 md:space-y-20">
          <article className="space-y-4">
            <h2 className="font-serif text-2xl">1. Who We Are</h2>
            <p className="text-sm text-muted-foreground">
              BZ Trade BV, operating as Brieflee, provides AI-assisted legal research tools to legal professionals and law students in Belgium and beyond.
              We are the Data Controller for the purposes of Regulation (EU) 2016/679 (GDPR) and applicable Belgian privacy legislation.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-serif text-2xl">2. Scope of this Policy</h2>
            <p className="text-sm text-muted-foreground">
              This policy explains the personal data we collect from users of the Service, why we process it, how long we retain it, and the rights you can
              exercise under the GDPR. The Service is intended for legal professionals and law students and is not directed at children under 16 years old.
            </p>
          </article>

          <article className="space-y-5">
            <h2 className="font-serif text-2xl">3. Data We Collect</h2>
            <p className="text-sm text-muted-foreground">
              We collect the following categories of personal data. Unless stated otherwise, data is required to deliver the Service securely.
            </p>
            <div className="grid gap-4 text-sm text-muted-foreground">
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-medium text-foreground">Account Data</h3>
                <p>Name, email address, phone number (provided by you, mandatory for registration).</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-medium text-foreground">Billing Data</h3>
                <p>Address, VAT or enterprise number (provided by you, collected for paid plans only).</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-medium text-foreground">Technical Data</h3>
                <p>IP address, browser or user-agent, and server logs (collected automatically, required for security).</p>
              </div>
              <div className="rounded-xl border bg-card p-4">
                <h3 className="font-medium text-foreground">Support Data</h3>
                <p>Messages you send to support (provided by you, optional).</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              We do not intentionally collect special categories of personal data (Article 9 GDPR) such as health or biometric information.
            </p>
          </article>

          <article className="space-y-5">
            <h2 className="font-serif text-2xl">4. Purposes and Legal Bases</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Provide and administer your account, authenticate log-ins</strong> — Article 6(1)(b) GDPR (contract).
              </p>
              <p>
                <strong className="text-foreground">Processing payments and invoicing</strong> — Article 6(1)(b) and 6(1)(c) GDPR (contract and legal obligation).
              </p>
              <p>
                <strong className="text-foreground">Maintain and secure the Service (debugging, preventing fraud)</strong> — Article 6(1)(f) GDPR (legitimate interest).
              </p>
              <p>
                <strong className="text-foreground">Respond to support requests</strong> — Article 6(1)(b) GDPR (contract).
              </p>
              <p>
                <strong className="text-foreground">Direct email updates about critical changes</strong> — Article 6(1)(f) GDPR (legitimate interest, you may object at any time).
              </p>
              <p>
                <strong className="text-foreground">Marketing newsletters (if offered)</strong> — Article 6(1)(a) GDPR (consent, opt-in).
              </p>
            </div>
          </article>

          <article className="space-y-4">
            <h2 className="font-serif text-2xl">5. Sharing and Sub-Processing</h2>
            <p className="text-sm text-muted-foreground">
              We only share personal data when necessary to deliver the Service:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              <li>Amazon Web Services (AWS) – EU (Ireland) region, for cloud hosting and storage.</li>
              <li>Stripe – payment processing for paid plans.</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              All providers act under written Data Processing Agreements in accordance with Article 28 GDPR.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-serif text-2xl">6. International Transfers</h2>
            <p className="text-sm text-muted-foreground">
              Primary data storage is located within the European Economic Area. If a sub-processor operates outside the EEA, we rely on adequacy decisions or
              Standard Contractual Clauses (SCCs) to protect your data.
            </p>
          </article>

          <article className="space-y-4">
            <h2 className="font-serif text-2xl">7. Retention</h2>
            <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              <li>Account data: retained while your account is active plus 12 months after deletion to resolve disputes.</li>
              <li>Billing records: retained for 7 years as required by Belgian accounting law.</li>
              <li>Server logs: retained for 6 months unless necessary for security investigations.</li>
            </ul>
          </article>

          <article className="space-y-4">
            <h2 className="font-serif text-2xl">8. Security Measures</h2>
            <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              <li>TLS encryption in transit and AES-256 encryption at rest on AWS.</li>
              <li>Network segmentation, firewalls, and regular vulnerability reviews.</li>
              <li>Role-based access controls with MFA for staff.</li>
              <li>Automated backups and integrity checks.</li>
            </ul>
          </article>

          <article className="space-y-3">
            <h2 className="font-serif text-2xl">9. Your Rights</h2>
            <p className="text-sm text-muted-foreground">
              You have the right to access, rectify, erase, restrict, or port your personal data, and to object to processing based on legitimate interests.
              For self-service edits, log into the Service and visit Settings → Profile. To delete your account or exercise other rights, email
              {" "}
              <a className="text-primary underline" href="mailto:support@brieflee.be">support@brieflee.be</a>.
              You may also lodge a complaint with the Belgian Data Protection Authority (Gegevensbeschermingsautoriteit), Rue de la Presse 35, 1000 Brussels.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="font-serif text-2xl">10. Changes to this Policy</h2>
            <p className="text-sm text-muted-foreground">
              We may update this policy as our practices evolve. We will notify you by email or in-app notice at least 14 days before material changes take
              effect if they impact your rights.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
