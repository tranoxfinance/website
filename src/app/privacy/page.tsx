import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Tranox collects, uses, shares, and protects your personal and financial information.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Information we collect",
    blocks: [
      "We collect the information needed to provide a secure, regulated money-transfer service across the Nigeria–Ivory Coast corridor.",
      {
        list: [
          "Identity and verification data: full name, date of birth, nationality, and government-issued identification used to complete KYC checks.",
          "Contact details: email address, phone number, and residential address.",
          "Transaction data: amounts, currencies, recipient details, exchange rates, fees, and payout methods.",
          "Financial information: bank account, mobile wallet, or card details used to fund or receive transfers.",
          "Device and usage data: IP address, device identifiers, and app interactions used to keep your account secure.",
        ],
      },
    ],
  },
  {
    heading: "How we use your information",
    blocks: [
      {
        list: [
          "To process transfers and pay out funds to your recipients.",
          "To verify your identity and meet our legal and regulatory obligations.",
          "To detect, prevent, and investigate fraud and other prohibited activity.",
          "To provide customer support and respond to your requests.",
          "To improve and secure our products and communicate important service updates.",
        ],
      },
    ],
  },
  {
    heading: "How we share information",
    blocks: [
      "We do not sell your personal information. We share it only as needed to operate the service and comply with the law.",
      {
        list: [
          "Licensed banking and payout partners who settle funds in each market.",
          "Payment processors and identity-verification providers acting on our behalf.",
          "Regulators, law-enforcement, and other authorities where required by applicable law.",
          "Professional advisers and service providers bound by confidentiality obligations.",
        ],
      },
    ],
  },
  {
    heading: "Data retention",
    blocks: [
      "We retain your information for as long as your account is active and for the period required to meet anti-money-laundering, tax, and other legal obligations in the markets we operate in. When data is no longer required, we securely delete or anonymise it.",
    ],
  },
  {
    heading: "Security",
    blocks: [
      "Your data is encrypted in transit and at rest, access is restricted on a need-to-know basis, and our systems are monitored continuously for unauthorised activity. No method of transmission or storage is completely secure, but we work to protect your information using industry-standard safeguards.",
    ],
  },
  {
    heading: "Your rights",
    blocks: [
      "Subject to applicable law, including the Nigeria Data Protection Act 2023, you may have the right to:",
      {
        list: [
          "Access the personal information we hold about you.",
          "Request correction of inaccurate or incomplete information.",
          "Request deletion of your information where we are not required to retain it.",
          "Object to or restrict certain processing of your information.",
        ],
      },
      "To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    heading: "International transfers",
    blocks: [
      "Because we operate across borders, your information may be processed in countries other than your own. Where this happens, we put appropriate safeguards in place to protect your information consistent with this policy.",
    ],
  },
  {
    heading: "Changes to this policy",
    blocks: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will update the date above and, where appropriate, notify you through the app or by email.",
    ],
  },
  {
    heading: "Contact us",
    blocks: [
      "If you have questions about this policy or how we handle your information, contact our team at support@tranox.com.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="June 7, 2026"
      intro="This Privacy Policy explains what information Tranox collects, how we use and share it, and the choices and rights you have. It applies to your use of the Tranox app, website, and related services, and we handle your information in line with the Nigeria Data Protection Act 2023 (NDPA) and directives issued by the Nigeria Data Protection Commission (NDPC)."
      sections={SECTIONS}
    />
  );
}
