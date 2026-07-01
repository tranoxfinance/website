import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of Tranox's cross-border money-transfer services.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of these terms",
    blocks: [
      "By creating an account or using Tranox, you agree to these Terms of Service. If you do not agree, you should not use the service. These terms form a binding agreement between you and Tranox.",
    ],
  },
  {
    heading: "Eligibility",
    blocks: [
      "You must be at least 18 years old and legally able to enter into a contract to use Tranox. You agree to provide accurate, current, and complete information and to keep it up to date.",
    ],
  },
  {
    heading: "Accounts and verification",
    blocks: [
      "You must complete identity verification (KYC) before sending or receiving money. You are responsible for safeguarding your login credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorised access.",
    ],
  },
  {
    heading: "Transfers and payouts",
    blocks: [
      "Tranox facilitates transfers between Nigeria (NGN) and Ivory Coast (XOF) in both directions. You are responsible for entering correct recipient and payout details. Transfers cannot be processed where details are inaccurate or where a transaction would breach applicable law.",
    ],
  },
  {
    heading: "Exchange rates and fees",
    blocks: [
      "The exchange rate and a single transparent fee are shown before you confirm a transfer. The rate is locked at the moment you confirm, so the amount your recipient receives does not change after you send. Rates shown before confirmation are indicative and may move until a transfer is confirmed.",
    ],
  },
  {
    heading: "Cancellations and refunds",
    blocks: [
      "Once a transfer is confirmed and paid out it generally cannot be reversed. If a transfer has not yet been paid out, you may request a cancellation and we will return the funds to your original payment method where possible. Refund timing depends on your bank or payment provider.",
    ],
  },
  {
    heading: "Prohibited use",
    blocks: [
      "You agree not to use Tranox to:",
      {
        list: [
          "Engage in money laundering, terrorist financing, fraud, or any unlawful activity.",
          "Send funds on behalf of an undisclosed third party.",
          "Provide false, misleading, or stolen information.",
          "Circumvent transfer limits, verification, or security controls.",
        ],
      },
    ],
  },
  {
    heading: "Compliance and limits",
    blocks: [
      "We operate under regulatory oversight and maintain anti-money-laundering and counter-terrorist-financing programs. We may apply transfer limits, request additional information, or delay, refuse, or reverse a transaction to comply with our legal and regulatory obligations.",
    ],
  },
  {
    heading: "Service availability",
    blocks: [
      "We aim to keep the service available at all times but do not guarantee uninterrupted access. Transfers may occasionally be delayed by factors outside our control, including the systems of banks, mobile-money providers, and other partners.",
    ],
  },
  {
    heading: "Limitation of liability",
    blocks: [
      "To the maximum extent permitted by law, Tranox is not liable for indirect, incidental, or consequential losses arising from your use of the service. Nothing in these terms excludes liability that cannot be excluded under applicable law.",
    ],
  },
  {
    heading: "Changes to these terms",
    blocks: [
      "We may update these terms from time to time. When we make material changes, we will update the date above and, where appropriate, notify you through the app or by email. Continued use of the service after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      "If you have questions about these terms, contact our team at support@tranox.com.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated="June 7, 2026"
      intro="These Terms of Service govern your access to and use of Tranox's cross-border money-transfer services. Please read them carefully before using the app or website."
      sections={SECTIONS}
    />
  );
}
