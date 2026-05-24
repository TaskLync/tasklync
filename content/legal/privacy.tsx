import type { LegalSection } from "@/components/layout/LegalLayout";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <>
        <p>
          TaskLync ("TaskLync", "we", "us", "our") is a technology company based in Pakistan. We operate the TaskLync platform accessible at tasklync.pk and through any associated applications or services.
        </p>

        <p>
          TaskLync acts as the data controller for personal information collected from users of the platform, including homeowners and professionals. In limited cases, we may act as a data processor where we process information on behalf of service providers strictly for verification and platform operations.
        </p>

        <p>
          For privacy related inquiries, you may contact us at{" "}
          <strong>privacy@tasklync.pk</strong>.
        </p>
      </>
    ),
  },

  {
    id: "what-we-collect",
    title: "2. Information We Collect",
    content: (
      <>
        <p><strong>Information you provide directly</strong></p>
        <ul>
          <li>Email address when joining or registering</li>
          <li>Address and profile information when creating an account</li>
          <li>Payment information processed securely through third party providers (we do not store full card details)</li>
          <li>Service requests, job descriptions, images, and communications on the platform</li>
          <li>Ratings and reviews submitted after service completion</li>
        </ul>

        <p><strong>Information collected during professional verification</strong></p>
        <ul>
          <li>Government-issued identity documents</li>
          <li>Facial verification data used for identity matching only</li>
          <li>Trade license details, certifications, or qualifications (if applicable)</li>
          <li>Insurance information where required for service categories</li>
          <li>Consent based background verification data via third-party providers</li>
        </ul>

        <p><strong>Information collected automatically</strong></p>
        <ul>
          <li>IP address and approximate location for security and fraud prevention</li>
          <li>Device, browser, and operating system details</li>
          <li>Usage data including pages visited, session duration, and interactions</li>
          <li>Referral and navigation sources</li>
        </ul>
      </>
    ),
  },

  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <>
        <p>We use collected information for the following purposes:</p>
        <ul>
          <li><strong>Platform operations:</strong> connecting users with verified professionals and enabling bookings</li>
          <li><strong>Communication:</strong> sending confirmations, updates, and support messages</li>
          <li><strong>Verification:</strong> validating professional identities and credentials</li>
          <li><strong>Fraud prevention:</strong> detecting suspicious activity and protecting platform integrity</li>
          <li><strong>Improvement:</strong> analysing usage patterns to enhance performance and user experience</li>
          <li><strong>Legal compliance:</strong> fulfilling applicable legal and regulatory obligations</li>
        </ul>

        <p>
          We do not sell personal data. We do not use personal data for third party behavioural advertising or profiling.
        </p>
      </>
    ),
  },

  {
    id: "legal-basis",
    title: "4. Legal Basis for Processing (GDPR)",
    content: (
      <>
        <p>
          For users in the European Economic Area (EEA) and United Kingdom, we rely on the following legal bases:
        </p>
        <ul>
          <li><strong>Contract:</strong> processing required to deliver services and fulfill bookings</li>
          <li><strong>Legitimate interests:</strong> fraud prevention, platform security, and service improvement</li>
          <li><strong>Legal obligation:</strong> compliance with applicable financial and regulatory laws</li>
          <li><strong>Consent:</strong> optional communications, which can be withdrawn at any time</li>
        </ul>
      </>
    ),
  },

  {
    id: "sharing",
    title: "5. How We Share Your Information",
    content: (
      <>
        <p>We share data only when necessary to operate the platform:</p>
        <ul>
          <li><strong>With service professionals:</strong> limited booking details required to complete a job</li>
          <li><strong>With verification providers:</strong> identity and background check data where applicable</li>
          <li><strong>With payment processors:</strong> secure payment processing handled by third-party providers</li>
          <li><strong>With infrastructure providers:</strong> cloud hosting and storage services under strict agreements</li>
          <li><strong>Legal compliance:</strong> where required by law or valid legal request</li>
        </ul>

        <p>
          We do not share personal data with advertising networks or data brokers.
        </p>
      </>
    ),
  },

  {
    id: "retention",
    title: "6. Data Retention",
    content: (
      <>
        <p>
          We retain personal data only for as long as necessary for operational or legal requirements.
        </p>
        <ul>
          <li>Inactive waitlist data: deleted after 24 months</li>
          <li>Account data: retained during active use and as required by law</li>
          <li>Verification records: retained for audit and compliance purposes</li>
          <li>Biometric data: deleted after completion of verification process</li>
          <li>System logs: typically retained for up to 90 days</li>
        </ul>
      </>
    ),
  },

  {
    id: "your-rights",
    title: "7. Your Rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the following rights:
        </p>
        <ul>
          <li>Access to personal data</li>
          <li>Correction of inaccurate data</li>
          <li>Deletion of personal data (subject to legal limits)</li>
          <li>Data portability</li>
          <li>Restriction or objection to processing</li>
          <li>Withdrawal of consent for optional processing</li>
        </ul>

        <p>
          Requests can be submitted to <strong>privacy@tasklync.pk</strong>. We respond within a reasonable timeframe and do not charge for standard requests.
        </p>
      </>
    ),
  },

  {
    id: "cookies",
    title: "8. Cookies and Tracking",
    content: (
      <>
        <p>We use essential cookies to operate the platform:</p>
        <ul>
          <li>Session cookies for authentication</li>
          <li>Security cookies for fraud prevention</li>
          <li>Basic analytics for platform improvement</li>
        </ul>

        <p>
          We do not use third party advertising trackers or behavioural advertising cookies.
        </p>
      </>
    ),
  },

  {
    id: "security",
    title: "9. Security",
    content: (
      <>
        <p>
          We implement industry-standard security measures to protect user data, including encryption and access controls.
        </p>
        <ul>
          <li>Encryption of data in transit and at rest</li>
          <li>Restricted internal access based on role</li>
          <li>Continuous monitoring for suspicious activity</li>
          <li>Regular security assessments and updates</li>
        </ul>
      </>
    ),
  },

  {
    id: "children",
    title: "10. Children's Privacy",
    content: (
      <>
        <p>
          TaskLync is not intended for individuals under 18 years of age. We do not knowingly collect data from minors.
        </p>
      </>
    ),
  },

  {
    id: "changes",
    title: "11. Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. Significant changes will be communicated where required. Continued use of the platform constitutes acceptance of updates.
        </p>
      </>
    ),
  },

  {
    id: "contact",
    title: "12. Contact",
    content: (
      <>
        <p>
          For privacy-related matters:
        </p>
        <p>
          <strong>TaskLync</strong>
          <br />
          Privacy Team
          <br />
          privacy@tasklync.pk
          <br />
          Pakistan
        </p>
      </>
    ),
  },
];