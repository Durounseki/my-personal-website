import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms-and-privacy")({
  component: TermsAndPrivacy,
});

function TermsAndPrivacy() {
  return (
    <article className="terms-container">
      <header className="terms-header">
        <h1>Terms of Service & Privacy Policy</h1>
        <p className="effective-date">Effective Date: January 16, 2026</p>
      </header>

      <section className="terms-section">
        <h2>1. General Principles</h2>
        <p>
          This website is a personal project and research platform. By creating
          an account, you agree to these terms. The service is provided "as is,"
          aimed at fostering professional connection and sharing knowledge in
          the fields of mathematics and engineering.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. Data Privacy & Security</h2>
        <ul>
          <li>
            <strong>Minimal Data Collection:</strong> I only collect the
            essential information necessary to manage your account (such as your
            email and username). I do not sell, rent, or trade your personal
            information with third parties.
          </li>
          <li>
            <strong>Security Standards:</strong> I implement industry-standard
            best practices to protect your data. This includes secure password
            encryption, protected session management, and the use of modern,
            secure communication protocols to prevent unauthorized access.
          </li>
          <li>
            <strong>Account Autonomy:</strong> You retain full control over your
            data. You may update your profile information or delete your account
            and all associated data at any time through your profile settings.
          </li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>3. Cookies and Tracking</h2>
        <ul>
          <li>
            <strong>Functional Cookies:</strong> This site uses secure cookies
            strictly for functional purposes, such as keeping you logged in and
            maintaining your session security.
          </li>
          <li>
            <strong>Third-Party Assets:</strong> To ensure a high-quality visual
            and interactive experience, this site may load assets from
            established third-party providers. These providers may process basic
            technical data (such as IP addresses) necessary to deliver these
            services.
          </li>
        </ul>
      </section>

      <section className="terms-section">
        <h2>4. User Responsibilities</h2>
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials. Any attempt to disrupt the service, harvest data,
          or bypass security features is strictly prohibited.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Updates to Terms</h2>
        <p>
          As this platform evolves with new research and projects, these terms
          may be updated. Continued use of the site constitutes acceptance of
          the current terms.
        </p>
      </section>
    </article>
  );
}
