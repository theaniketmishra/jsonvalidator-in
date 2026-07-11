import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `The terms that govern your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const lastUpdated = "July 4, 2026";

export default function TermsPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Terms &amp; Conditions</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">1. Acceptance of terms</h2>
          <p className="mt-3">
            By accessing or using {siteConfig.name} (the &quot;Service&quot;), you agree to be bound by these Terms
            &amp; Conditions. If you do not agree to these terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">2. Description of the Service</h2>
          <p className="mt-3">
            {siteConfig.name} provides free, browser-based tools for validating, formatting, repairing, viewing, and
            converting JSON data, along with related documentation and educational content. The Service is provided
            &quot;as is&quot; for informational and productivity purposes.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">3. No account, no warranty of data handling</h2>
          <p className="mt-3">
            The Service does not require registration or an account. Tools run client-side in your browser, and we do
            not store the content you process. You are solely responsible for safeguarding your own data — for
            example, by downloading or copying output before closing your browser tab, since nothing is auto-saved.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">4. Acceptable use</h2>
          <p className="mt-3">You agree not to use the Service to:</p>
          <ul className="mt-3 list-inside list-disc space-y-1.5">
            <li>Violate any applicable law or regulation;</li>
            <li>Attempt to gain unauthorized access to our systems or interfere with the Service&apos;s operation;</li>
            <li>Transmit malware, or use automated scripts to abuse or overload the Service;</li>
            <li>Process data you do not have the legal right to process, including data that infringes on the intellectual property or privacy rights of others.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">5. Intellectual property</h2>
          <p className="mt-3">
            The Service, including its design, code, branding, and written content (excluding any JSON or other data
            you process through it), is owned by {siteConfig.name} and protected by applicable intellectual property
            laws. You retain all rights to the data you process using the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">6. Third-party links and advertising</h2>
          <p className="mt-3">
            The Service may display advertisements served by third-party providers, including Google, and may link to
            third-party websites. We do not control and are not responsible for the content, privacy practices, or
            accuracy of third-party sites or advertisements.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">7. Disclaimer of warranties</h2>
          <p className="mt-3">
            The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of
            any kind, whether express or implied, including but not limited to warranties of merchantability, fitness
            for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted,
            error-free, or that any conversion or repair output will be perfectly accurate for every possible input —
            you should always review important output before relying on it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">8. Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, {siteConfig.name} and its operators shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or
            revenue, arising out of or related to your use of, or inability to use, the Service.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">9. Changes to the Service or these terms</h2>
          <p className="mt-3">
            We may modify, suspend, or discontinue the Service, or update these Terms, at any time. Material changes
            to these Terms will be reflected by updating the &quot;Last updated&quot; date above. Continued use of the
            Service after changes take effect constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">10. Governing law</h2>
          <p className="mt-3">
            These Terms are governed by the laws of India, without regard to conflict-of-law principles, without
            prejudice to any mandatory consumer-protection rights you may have under the laws of your own country of
            residence.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">11. Contact us</h2>
          <p className="mt-3">
            Questions about these Terms can be sent to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary underline underline-offset-2">
              {siteConfig.contactEmail}
            </a>{" "}
            or via the <a href="/contact" className="text-primary underline underline-offset-2">Contact page</a>.
          </p>
        </section>

        <p className="border-t border-border pt-6 text-xs text-muted-foreground">
          This page is provided as general information and does not constitute legal advice. If you need to ensure
          compliance with a specific law or regulation, please consult a qualified professional.
        </p>
      </div>
    </div>
  );
}
