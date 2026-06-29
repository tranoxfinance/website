"use client";

import { motion } from "framer-motion";
import { Zap, TrendingUp, Wallet, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real-Time FX Rates",
    description:
      "Live NGN/XOF exchange rates fetched directly from Kora and locked for 30 seconds at transfer confirmation — you always know exactly what your recipient gets.",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description:
      "Money moves in under 30 seconds from initiation to delivery. Powered by Kora's payment rail with real-time webhook confirmations.",
  },
  {
    icon: Wallet,
    title: "Bank & Mobile Money",
    description:
      "Send to any Nigerian bank account or Ivorian mobile money wallet — Orange Money, MTN MoMo, and Moov. Full coverage across both corridors.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Security",
    description:
      "Didit-verified KYC with tiered transfer limits, OFAC/UN sanctions screening, AES-256 encrypted document storage, and full CBN and BCEAO compliance.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#C8FF00] text-sm font-medium tracking-widest uppercase mb-3">
            Features
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Everything You Need to
            <br />
            Transfer Money Across Borders
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-8 hover:border-[#C8FF00]/20 transition-colors"
              >
                <div className="w-12 h-12 bg-[#C8FF00]/10 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-[#C8FF00]" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
