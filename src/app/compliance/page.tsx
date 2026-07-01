import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "How Tranox meets its regulatory, anti-money-laundering, and consumer-protection obligations across the Nigeria–Ivory Coast corridor.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Regulatory framework",
    blocks: [
      "Tranox operates under regulatory oversight in each market it serves and works only with licensed banking and payout partners to settle funds. We design our products to comply with the laws and supervisory requirements that apply to cross-border money transfers between Nigeria and Ivory Coast, including:",
      {
        list: [
          "Central Bank of Nigeria (CBN) regulations, including Payment Service Provider guidelines.",
          "Anti-Money Laundering and Combating the Financing of Terrorism (AML/CFT) laws.",
          "The Nigeria Data Protection Act 2023 and directives issued by the Nigeria Data Protection Commission (NDPC).",
          "BCEAO and WAEMU regulations governing cross-border CFA franc (XOF) transactions.",
        ],
      },
    ],
  },
  {
    heading: "Anti-money-laundering (AML) and counter-terrorist financing (CFT)",
    blocks: [
      "We maintain a risk-based AML/CFT program aligned with applicable laws and international standards. Our controls include:",
      {
        list: [
          "Customer due diligence and enhanced due diligence for higher-risk activity.",
          "Ongoing transaction monitoring to detect unusual or suspicious patterns.",
          "Screening against applicable sanctions and watchlists.",
          "Reporting of suspicious activity to the relevant authorities where required.",
        ],
      },
    ],
  },
  {
    heading: "Know Your Customer (KYC)",
    blocks: [
      "Every customer must complete identity verification before sending or receiving money. We collect and verify government-issued identification and other information needed to confirm your identity. Verification is reusable across future transfers, and we may request additional information at any time to meet our obligations.",
    ],
  },
  {
    heading: "Sanctions screening",
    blocks: [
      "We screen customers, recipients, and transactions against applicable sanctions lists. Transfers that involve sanctioned individuals, entities, or jurisdictions will be blocked, and we may be required to report and freeze related funds.",
    ],
  },
  {
    heading: "Transaction monitoring and limits",
    blocks: [
      "We monitor activity continuously and apply transfer limits based on your verification level and risk profile. We may delay, decline, or reverse a transaction, or request further information, where this is necessary to comply with the law or to protect customers from fraud.",
    ],
  },
  {
    heading: "Safeguarding of funds",
    blocks: [
      "Customer funds are handled through regulated partners and are kept separate from our own operating funds in line with applicable safeguarding requirements, so that funds remain protected while a transfer is being processed.",
    ],
  },
  {
    heading: "Data protection",
    blocks: [
      "We handle personal and financial information in line with our Privacy Policy and applicable data-protection laws, including the Nigeria Data Protection Act 2023 and NDPC directives, using encryption and strict access controls to keep your information secure.",
    ],
  },
  {
    heading: "Reporting concerns",
    blocks: [
      "If you suspect fraud, financial crime, or any misuse of our service, contact our compliance team at support@tranox.com. We take all reports seriously and investigate promptly.",
    ],
  },
];

export default function CompliancePage() {
  return (
    <LegalPage
      title="Compliance"
      lastUpdated="June 7, 2026"
      intro="Trust is the foundation of cross-border payments. This page explains how Tranox meets its regulatory, anti-money-laundering, and consumer-protection obligations across the Nigeria–Ivory Coast corridor."
      sections={SECTIONS}
    />
  );
}
