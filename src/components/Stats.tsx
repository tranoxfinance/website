"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$500M+", label: "Transferred Securely" },
  { value: "12,000+", label: "Trusted by users" },
  { value: "★ 4.8", label: "App Store rating" },
];

export default function Stats() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl lg:text-4xl font-bold text-white text-center mb-12"
        >
          Our Journey in Numbers: Growth,
          <br />
          Trust, and Impact
        </motion.h2>

        <div className="grid grid-cols-3 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center px-8"
            >
              <p className="text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
