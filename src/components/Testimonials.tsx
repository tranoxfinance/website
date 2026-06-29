"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Amaka O.",
    role: "Lagos, Nigeria",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "The transfer screen shows everything clearly. Balance, rate, and recipient details — no confusion. The money arrives on Orange Money before I even put my phone down.",
  },
  {
    name: "Kofi Atta",
    role: "Abidjan, Côte d'Ivoire",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    text: "Envoyer de l'argent est super rapide et l'application est très sécurisée. Je l'utilise presque chaque semaine pour recevoir de la famille au Nigeria.",
  },
  {
    name: "Chidi E.",
    role: "Port Harcourt, Nigeria",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    text: "Finally an app built specifically for NGN to XOF. The design is clean and the rate is always transparent. It doesn't feel complicated like other finance apps.",
  },
  {
    name: "Amara D.",
    role: "Lagos, Nigeria",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "The home screen shows everything clearly. Balance, transactions, and transfer history — no confusion. Best fintech app I have used for cross-border payments.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const visible = [
    testimonials[current],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Trusted by
              <br />
              Users Every Day
            </h2>
            <p className="text-gray-500 text-sm mt-3 max-w-xs">
              Real feedback from people who use Tranox to send money across borders.
            </p>
          </motion.div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white hover:border-[#C8FF00]/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-[#111111] border border-white/10 flex items-center justify-center text-white hover:border-[#C8FF00]/50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visible.map((t, index) => (
              <motion.div
                key={`${t.name}-${current}-${index}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C8FF00] text-[#C8FF00]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0">
                    <Image src={t.avatar} alt={t.name} width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
