"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    tagline: "For basic usage",
    monthly: 0,
    annually: 0,
    cta: "Get Started Free",
    popular: false,
    features: [
      "Phone verification (Tier 0)",
      "View live FX rates",
      "Up to 3 saved recipients",
      "Transaction history",
      "Basic security",
    ],
  },
  {
    name: "Personal",
    tagline: "For individuals",
    monthly: 9,
    annually: 7,
    cta: "Get Started",
    popular: false,
    features: [
      "BVN or National ID KYC (Tier 1)",
      "Up to ₦50,000/day transfers",
      "Mobile money & bank payouts",
      "Push notifications",
      "Email receipts",
    ],
  },
  {
    name: "Pro",
    tagline: "For professionals",
    monthly: 29,
    annually: 23,
    cta: "Get Started",
    popular: true,
    features: [
      "ID + Selfie liveness check (Tier 2)",
      "Up to ₦500,000/day transfers",
      "Priority transfer processing",
      "Biometric login",
      "Dedicated support",
    ],
  },
  {
    name: "Business",
    tagline: "For teams",
    monthly: 99,
    annually: 79,
    cta: "Get Started",
    popular: false,
    features: [
      "Enhanced due diligence (Tier 3)",
      "CBN & BCEAO max limits",
      "Multi-user access",
      "AML & compliance reports",
      "SLA-backed support",
    ],
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Simple, Transparent
            <br />
            Pricing
          </h2>
          <p className="text-gray-500 mt-4 text-sm">
            Choose the plan that fits your transfer needs. Upgrade or cancel anytime.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm ${!annual ? "text-white" : "text-gray-500"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-[#C8FF00]" : "bg-white/10"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${annual ? "left-7" : "left-1"}`}
              />
            </button>
            <span className={`text-sm ${annual ? "text-white" : "text-gray-500"}`}>Annually</span>
            <span className="text-xs bg-[#C8FF00]/20 text-[#C8FF00] px-2 py-0.5 rounded-full font-medium">-20%</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-6 flex flex-col gap-4 ${
                plan.popular
                  ? "bg-gradient-to-b from-[#C8FF00]/80 to-[#4a6b00] border border-[#C8FF00]/30"
                  : "bg-[#111111] border border-white/5"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 text-[10px] font-bold text-black bg-white rounded-full px-2.5 py-0.5">
                  Popular
                </span>
              )}
              <div>
                <p className={`font-semibold text-sm ${plan.popular ? "text-black" : "text-white"}`}>{plan.name}</p>
                <p className={`text-xs mt-0.5 ${plan.popular ? "text-black/70" : "text-gray-500"}`}>{plan.tagline}</p>
              </div>
              <div>
                <span className={`text-4xl font-bold ${plan.popular ? "text-black" : "text-white"}`}>
                  ${annual ? plan.annually : plan.monthly}
                </span>
                <span className={`text-xs ml-1 ${plan.popular ? "text-black/70" : "text-gray-500"}`}>/month</span>
              </div>
              <button
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  plan.popular
                    ? "bg-black text-white hover:bg-black/80"
                    : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </button>
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-black" : "text-[#C8FF00]"}`} />
                    <span className={`text-xs leading-relaxed ${plan.popular ? "text-black/80" : "text-gray-400"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
