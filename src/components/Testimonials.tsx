"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Amaka O.",
    role: "Lagos, Nigeria",
    initials: "AO",
    rating: 5,
    text: "I send money to my family in Abidjan every month. Tranox is the fastest I have found — the money arrives on Orange Money before I even put my phone down.",
  },
  {
    name: "Kofi A.",
    role: "Abidjan, Côte d'Ivoire",
    initials: "KA",
    rating: 5,
    text: "Le taux de change est toujours juste et le transfert arrive en quelques secondes. Enfin une application faite pour notre corridor.",
  },
  {
    name: "Chidi E.",
    role: "Port Harcourt, Nigeria",
    initials: "CE",
    rating: 5,
    text: "Finally an app built specifically for NGN to XOF. No more expensive bank wires or shady parallel-market rates. Tranox is transparent and instant.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#C8FF00] text-sm font-medium tracking-widest uppercase mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Trusted by Senders Across
            <br />
            Both Corridors
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#111111] border border-white/5 rounded-2xl p-7 flex flex-col gap-5 hover:border-[#C8FF00]/20 transition-colors"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8FF00] text-[#C8FF00]" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8FF00]/15 border border-[#C8FF00]/20 flex items-center justify-center">
                  <span className="text-[#C8FF00] text-sm font-bold">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
