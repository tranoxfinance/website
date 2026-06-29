"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(200,255,0,0.08),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Send Money, Unlock Your{" "}
          <span className="text-[#C8FF00]">Financial</span> Freedom
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-gray-400 text-lg max-w-xl mx-auto leading-relaxed"
        >
          The fastest way to send NGN to XOF between Nigeria and Côte
          d&apos;Ivoire. Real-time rates, zero hidden fees, instant delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <a
            href="#download"
            className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 leading-none">Download on the</p>
              <p className="text-sm font-semibold leading-tight">App Store</p>
            </div>
          </a>
          <a
            href="#download"
            className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.63.24.97.21l13.1-7.35-2.83-2.83-11.24 9.97zM.32 1.5C.12 1.83 0 2.24 0 2.72v18.56c0 .48.12.89.32 1.22l.07.06 10.4-10.4v-.25L.39 1.44l-.07.06zM20.8 10.27l-2.85-1.6-3.18 3.18 3.18 3.18 2.87-1.61c.82-.46.82-1.21-.02-1.75zM4.15.24l13.1 7.35-2.83 2.83L3.18.45A1.2 1.2 0 0 1 4.15.24z" />
            </svg>
            <div className="text-left">
              <p className="text-[10px] text-gray-500 leading-none">GET IT ON</p>
              <p className="text-sm font-semibold leading-tight">Google Play</p>
            </div>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="relative mt-16 w-full flex justify-center"
      >
        <div className="relative w-[600px] h-[420px]">
          <Image
            src="/images/hero-phones.jpg"
            alt="Tranox app on two smartphones"
            fill
            className="object-contain object-bottom"
            priority
          />

          <div className="absolute top-8 left-0 z-10 bg-[#141414]/90 backdrop-blur-sm border border-white/10 rounded-2xl p-3 flex items-center gap-2 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-[#C8FF00]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#C8FF00]" />
            </div>
            <div>
              <p className="text-white text-[10px] font-semibold">Live Rate</p>
              <p className="text-[#C8FF00] text-[9px]">1 NGN = 0.76 XOF</p>
            </div>
          </div>

          <div className="absolute top-6 right-0 z-10 bg-[#141414]/90 backdrop-blur-sm border border-white/10 rounded-full p-3 shadow-xl">
            <CheckCircle className="w-5 h-5 text-[#C8FF00]" />
          </div>

          <div className="absolute top-1/2 left-4 z-10 w-3 h-3 rounded-full bg-[#C8FF00]" />
          <div className="absolute top-16 right-8 z-10 w-2 h-2 rounded-full bg-[#C8FF00]/50" />

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#080808] to-transparent z-10" />
        </div>
      </motion.div>
    </section>
  );
}
