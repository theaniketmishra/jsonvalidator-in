import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles data, cookies, and third-party advertising.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "July 4, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-3xl py-16 sm:py-24">
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

      <div className="prose-content mt-10 space-y-8 leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">1. Overview</h2>
          <p className="mt-3">
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides free, browser-based tools for
            working with JSON — including the JSON Validator, Formatter, Repair, Viewer, and converter tools
            available on this site (the &quot;Service&quot;). This Privacy Policy explains what information is
            collected when you use the Service, how it is used, and the choices available to you. By using the
            Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">2. The data you paste into our tools</h2>
          <p className="mt-3">
            Every tool on {siteConfig.name} — validation, formatting, repair, viewing, and conversion — runs entirely
            client-side, inside your own browser&apos;s JavaScript engine. The JSON you paste, upload, or load from a
            URL is processed locally on your device. It is not transmitted to, logged by, or stored on our servers.
            We have no visibility into the content of what you paste into the editor.
          </p>
          <p className="mt-3">
            The one exception is the optional &quot;Load from URL&quot; feature: if you choose to load JSON from a
            URL you provide, your browser makes a direct network request to that URL. That request is made by your
            browser, not routed through our servers, and is subject to the privacy practices of whichever site you
            requested data from.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">3. Information collected automatically</h2>
          <p className="mt-3">
            Like most websites, our servers and any analytics or advertising services we use may automatically
            collect standard technical information when you visit, such as your IP address, browser type and
            version, device type, operating system, referring page, pages visited, and timestamps. This information
            is used in aggregate to understand how the Service is used, diagnose technical issues, and improve
            performance — it is not used to identify you personally.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">4. Cookies and similar technologies</h2>
          <p className="mt-3">
            We use a minimal, first-party cookie to remember your light/dark theme preference between visits. This
            cookie does not identify you personally and is not used for tracking or advertising.
          </p>
          <p className="mt-3">
            If and when third-party analytics or advertising services are enabled on this site (see Section 5), those
            providers may set their own cookies or use similar technologies (such as web beacons or local storage) in
            your browser, subject to their own privacy policies. You can control or delete cookies through your
            browser settings at any time; note that disabling cookies may affect some site functionality, such as
            remembering your theme preference.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">5. Advertising and third-party vendors</h2>
          <p className="mt-3">
            {siteConfig.name} is a free service, and may be supported in part by advertising served by third-party
            vendors, including Google. Google and other third-party vendors may use cookies to serve ads based on a
            user&apos;s prior visits to this website or other websites on the internet. Google&apos;s use of
            advertising cookies enables it and its partners to serve ads based on your visits to this site and/or
            other sites.
          </p>
          <p className="mt-3">
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline underline-offset-2"
            >
              Google Ads Settings
            </a>
            . You can also visit{" "}
            <a
              href="https://www.aboutads.info/choices"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-primary underline underline-offset-2"
            >
              www.aboutads.info/choices
            </a>{" "}
            to opt out of third-party vendors&apos; use of cookies for personalized advertising more broadly.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">6. Analytics</h2>
          <p className="mt-3">
            We may use privacy-respecting analytics services to understand aggregate usage patterns — for example,
            which tools are most used and which pages need improvement. Analytics data is used only in aggregate and
            is not linked to the content you process in any tool.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">7. Children&apos;s privacy</h2>
          <p className="mt-3">
            The Service is not directed at children under 13 (or the equivalent minimum age in your jurisdiction), and
            we do not knowingly collect personal information from children. If you believe a child has provided us
            with personal information, please contact us and we will take steps to remove it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">8. Your rights</h2>
          <p className="mt-3">
            Depending on your location, you may have rights under applicable data protection law (such as the GDPR in
            the European Economic Area, or India&apos;s Digital Personal Data Protection Act) to access, correct, or
            request deletion of personal information we hold about you. Because the Service does not require an
            account and does not store the content of what you process, we generally hold very little personal data
            about individual users beyond the automatically collected technical information described in Section 3.
            To make a request or ask a question about your data, contact us using the details in Section 10.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">9. Changes to this policy</h2>
          <p className="mt-3">
            We may update this Privacy Policy from time to time, for example to reflect new features or legal
            requirements. We will update the &quot;Last updated&quot; date at the top of this page when we do. We
            encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-foreground">10. Contact us</h2>
          <p className="mt-3">
            If you have questions about this Privacy Policy or how {siteConfig.name} handles data, contact us at{" "}
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
