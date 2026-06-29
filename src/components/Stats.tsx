"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "< 30s", label: "Average Transfer Time" },
  { value: "2", label: "Countries Connected" },
  { value: "0", label: "Hidden Fees" },
  { value: "256-bit", label: "AES Encryption" },
];

export default function Stats() {
  return (
    <section className="border-y border-white/5 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl lg:text-4xl font-bold text-[#C8FF00]">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
