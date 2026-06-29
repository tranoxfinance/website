"use client";

import { motion } from "framer-motion";
import { UserPlus, BadgeCheck, SendHorizonal } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Register with your phone number and receive an OTP via SMS. Takes less than 60 seconds.",
  },
  {
    number: "02",
    icon: BadgeCheck,
    title: "Verify Your Identity",
    description:
      "Complete a quick KYC check with your BVN or National ID to unlock your transfer limits.",
  },
  {
    number: "03",
    icon: SendHorizonal,
    title: "Send Money",
    description:
      "Enter the amount, pick your recipient, confirm the live rate, and authorise with your PIN.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#C8FF00] text-sm font-medium tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Three Steps to Send Money
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[33%] right-[33%] h-px bg-gradient-to-r from-transparent via-[#C8FF00]/30 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#111111] border border-white/8 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#C8FF00]" />
                  </div>
                  <span className="absolute -top-2 -right-2 text-[10px] font-bold text-black bg-[#C8FF00] rounded-full w-6 h-6 flex items-center justify-center">
                    {step.number.replace("0", "")}
                  </span>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
