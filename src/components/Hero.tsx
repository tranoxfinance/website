"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";

function PhoneMockup() {
  return (
    <div className="relative w-[240px] h-[490px] bg-[#1c1c1c] rounded-[2.8rem] border-2 border-[#2a2a2a] shadow-2xl mx-auto">
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#080808] rounded-full z-10" />
      <div className="absolute inset-1 rounded-[2.5rem] overflow-hidden bg-[#0d0d0d] flex flex-col">
        <div className="flex justify-between items-center px-5 pt-8 pb-1">
          <span className="text-white text-[11px] font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
            <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
            <div className="w-3 h-1.5 bg-[#C8FF00] rounded-sm" />
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-[9px]">T</span>
            </div>
            <span className="text-white text-sm font-bold">Tranox</span>
          </div>
          <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10" />
        </div>

        <div className="px-5 py-2">
          <p className="text-gray-500 text-[10px]">Available Balance</p>
          <p className="text-white text-2xl font-bold mt-0.5">₦150,000</p>
        </div>

        <div className="flex mx-5 bg-[#1a1a1a] rounded-xl p-1 gap-1 mt-1">
          <button className="flex-1 bg-[#C8FF00] text-black text-[11px] font-bold py-1.5 rounded-lg">
            Send
          </button>
          <button className="flex-1 text-gray-400 text-[11px] font-medium py-1.5">
            Receive
          </button>
        </div>

        <div className="px-5 mt-3 space-y-2">
          <div className="bg-[#1a1a1a] rounded-xl p-3">
            <p className="text-gray-500 text-[10px]">You Send</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white text-base font-bold">₦50,000</span>
              <span className="text-[#C8FF00] text-[10px] font-semibold bg-[#C8FF00]/10 px-2 py-0.5 rounded-full">
                NGN
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-7 h-7 bg-[#C8FF00] rounded-full flex items-center justify-center">
              <ArrowRightLeft className="w-3.5 h-3.5 text-black" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-xl p-3">
            <p className="text-gray-500 text-[10px]">Recipient Gets</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white text-base font-bold">XOF 38,000</span>
              <span className="text-[#C8FF00] text-[10px] font-semibold bg-[#C8FF00]/10 px-2 py-0.5 rounded-full">
                XOF
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-[9px] text-center mt-2">
          Rate: 1 NGN = 0.76 XOF — locked for 30s
        </p>

        <div className="px-5 mt-3">
          <button className="w-full bg-[#C8FF00] text-black text-sm font-bold py-3 rounded-xl">
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(200,255,0,0.12),transparent)]" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
            <span className="text-[#C8FF00] text-xs font-medium">
              Nigeria to Côte d&apos;Ivoire — Now Live
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight"
          >
            Send Money
            <br />
            <span className="text-[#C8FF00]">NGN to XOF</span>
            <br />
            Instantly.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg leading-relaxed max-w-md"
          >
            Fast, secure cross-border transfers between Nigeria and Côte
            d&apos;Ivoire. Real-time exchange rates, zero hidden fees, delivered
            to any bank or mobile money wallet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#download"
              className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[10px] text-gray-600">Download on the</p>
                <p className="text-sm font-semibold leading-tight">App Store</p>
              </div>
            </a>
            <a
              href="#download"
              className="flex items-center gap-3 bg-white text-black px-5 py-3 rounded-2xl hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.63.24.97.21l13.1-7.35-2.83-2.83-11.24 9.97zM.32 1.5C.12 1.83 0 2.24 0 2.72v18.56c0 .48.12.89.32 1.22l.07.06 10.4-10.4v-.25L.39 1.44l-.07.06zM20.8 10.27l-2.85-1.6-3.18 3.18 3.18 3.18 2.87-1.61c.82-.46.82-1.21-.02-1.75zM4.15.24l13.1 7.35-2.83 2.83L3.18.45A1.2 1.2 0 0 1 4.15.24z" />
              </svg>
              <div>
                <p className="text-[10px] text-gray-600">GET IT ON</p>
                <p className="text-sm font-semibold leading-tight">Google Play</p>
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(200,255,0,0.08),transparent)]" />
          <div className="relative z-10">
            <PhoneMockup />
          </div>
          <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#C8FF00]/5 rounded-full blur-3xl" />
          <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#C8FF00]/5 rounded-full blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
