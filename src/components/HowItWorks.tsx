"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Create Your Account",
    description: "Register with your phone number in seconds. Receive an OTP via SMS and set your secure PIN.",
  },
  {
    number: "2",
    title: "Verify Your Identity",
    description: "Complete a quick KYC check with your BVN or National ID to unlock your transfer limits.",
  },
  {
    number: "3",
    title: "Send Money",
    description: "Enter amount, pick your recipient, confirm the live NGN/XOF rate, and authorise with your PIN.",
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
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Your Everyday Transfer,
            <br />
            Simplified
          </h2>
          <p className="text-gray-500 mt-4 text-sm max-w-md mx-auto">
            From account creation to daily use, get started quickly and send money with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="w-10 h-10 bg-[#C8FF00] rounded-xl flex items-center justify-center mb-5">
                <span className="text-black font-black text-lg">{step.number}</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
