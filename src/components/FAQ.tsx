"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is my money secure with Tranox?",
    answer: "Yes. All transfers are protected with 256-bit AES encryption, RS256 JWT authentication, and full KYC verification via Didit. Your KYC documents are stored encrypted in Cloudflare R2 and we never store your card details.",
  },
  {
    question: "How fast are NGN to XOF transfers?",
    answer: "Transfers are typically completed in under 30 seconds from the moment you confirm. Funds are delivered instantly to the recipient's bank account or mobile money wallet (Orange Money, MTN MoMo, or Moov).",
  },
  {
    question: "What are the transfer limits?",
    answer: "Limits are based on your KYC tier. Tier 1 (BVN or National ID) allows up to ₦50,000/day. Tier 2 (ID + selfie) allows up to ₦500,000/day. Tier 3 (enhanced due diligence) allows up to the CBN and BCEAO regulatory maximums.",
  },
  {
    question: "Which mobile money providers are supported?",
    answer: "We support all major Ivorian mobile money providers including Orange Money, MTN MoMo, and Moov. On the Nigerian side, we support all commercial bank accounts covered by the CBN inter-bank settlement system.",
  },
  {
    question: "What platforms are supported?",
    answer: "Tranox is available on iOS (App Store) and Android (Google Play). A web dashboard for business accounts is also available.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 mt-4 text-sm">
            Quick answers to common questions about using Tranox securely and confidently.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border-b border-white/8"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="text-white font-medium text-sm pr-8">{faq.question}</span>
                {open === index ? (
                  <Minus className="w-4 h-4 text-[#C8FF00] shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm leading-relaxed pb-5">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
