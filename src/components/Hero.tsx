"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, TrendingUp, CheckCircle } from "lucide-react";

function PhoneMockupMain() {
  return (
    <div className="w-[220px] h-[440px] bg-[#141414] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-5 pt-7 pb-2">
        <span className="text-white text-[11px] font-medium">9:41</span>
        <div className="flex gap-1">
          <div className="w-3 h-1.5 rounded-sm bg-white/50" />
          <div className="w-3 h-1.5 rounded-sm bg-white/50" />
          <div className="w-3 h-1.5 rounded-sm bg-[#C8FF00]" />
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
            <span className="text-black font-black text-[9px]">T</span>
          </div>
          <span className="text-white text-sm font-bold">Tranox</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#C8FF00]/20 border border-[#C8FF00]/30 flex items-center justify-center">
          <span className="text-[#C8FF00] text-[10px] font-bold">S</span>
        </div>
      </div>
      <div className="px-5 pt-2 pb-3">
        <p className="text-gray-500 text-[10px]">Current balance</p>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-white text-2xl font-bold">₦150,000</p>
          <button className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-white/50 text-[10px]">+</span>
          </button>
        </div>
        <p className="text-gray-600 text-[9px] mt-0.5">Add Balance</p>
      </div>
      <div className="flex mx-5 gap-2 mb-3">
        <button className="flex-1 bg-[#C8FF00] text-black text-xs font-bold py-2 rounded-xl">Send</button>
        <button className="flex-1 border border-white/10 text-white text-xs py-2 rounded-xl">Received</button>
      </div>
      <p className="text-gray-600 text-[9px] text-center mb-1">Fees may apply</p>
      <div className="px-5 mt-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-white text-xs font-semibold">Transactions</p>
          <p className="text-[#C8FF00] text-[10px]">See All</p>
        </div>
        {[
          { name: "Kofi Atta", amount: "-XOF 19,000", sub: "1 hr ago" },
          { name: "Amara D.", amount: "-XOF 7,600", sub: "Yesterday" },
          { name: "Felix O.", amount: "+₦50,000", sub: "2 days ago" },
        ].map((tx) => (
          <div key={tx.name} className="flex items-center justify-between py-2 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/10" />
              <div>
                <p className="text-white text-[10px] font-medium">{tx.name}</p>
                <p className="text-gray-600 text-[9px]">{tx.sub}</p>
              </div>
            </div>
            <p className="text-white text-[10px] font-medium">{tx.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneMockupBack() {
  return (
    <div className="w-[200px] h-[400px] bg-[#141414] rounded-[2.5rem] border border-white/10 shadow-xl overflow-hidden flex flex-col">
      <div className="flex justify-between items-center px-5 pt-7 pb-2">
        <span className="text-white text-[11px] font-medium">9:41</span>
      </div>
      <div className="px-5 py-2">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-white text-[9px]">←</span>
          </div>
          <p className="text-white text-xs font-semibold">Send Money</p>
        </div>
      </div>
      <div className="px-5 space-y-2 mt-2">
        <div className="bg-[#1a1a1a] rounded-xl p-3">
          <p className="text-gray-500 text-[9px] mb-1">You Send</p>
          <div className="flex justify-between">
            <span className="text-white text-sm font-bold">₦50,000</span>
            <span className="text-[#C8FF00] text-[9px] bg-[#C8FF00]/10 px-1.5 py-0.5 rounded-full">NGN</span>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-6 h-6 bg-[#C8FF00] rounded-full flex items-center justify-center">
            <ArrowRightLeft className="w-3 h-3 text-black" />
          </div>
        </div>
        <div className="bg-[#1a1a1a] rounded-xl p-3">
          <p className="text-gray-500 text-[9px] mb-1">Recipient Gets</p>
          <div className="flex justify-between">
            <span className="text-white text-sm font-bold">XOF 38,000</span>
            <span className="text-[#C8FF00] text-[9px] bg-[#C8FF00]/10 px-1.5 py-0.5 rounded-full">XOF</span>
          </div>
        </div>
        <p className="text-gray-600 text-[9px] text-center">Rate: 1 NGN = 0.76 XOF</p>
        <button className="w-full bg-[#C8FF00] text-black text-xs font-bold py-2.5 rounded-xl mt-1">
          Confirm Transfer
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(200,255,0,0.1),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight"
        >
          Send Money Unlock Your{" "}
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
        <div className="relative w-[580px] h-[480px]">
          <div className="absolute left-12 bottom-0 z-10">
            <PhoneMockupBack />
          </div>
          <div className="absolute right-12 bottom-0 z-20">
            <PhoneMockupMain />
          </div>

          <div className="absolute top-8 left-4 z-30 bg-[#141414] border border-white/10 rounded-2xl p-3 flex items-center gap-2 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-[#C8FF00]/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#C8FF00]" />
            </div>
            <div>
              <p className="text-white text-[10px] font-semibold">Live Rate</p>
              <p className="text-[#C8FF00] text-[9px]">1 NGN = 0.76 XOF</p>
            </div>
          </div>

          <div className="absolute top-6 right-4 z-30 bg-[#141414] border border-white/10 rounded-full p-3 shadow-xl">
            <CheckCircle className="w-5 h-5 text-[#C8FF00]" />
          </div>

          <div className="absolute top-1/2 left-0 z-30 w-3 h-3 rounded-full bg-[#C8FF00]" />
          <div className="absolute top-16 right-8 z-30 w-2 h-2 rounded-full bg-[#C8FF00]/50" />
        </div>
      </motion.div>
    </section>
  );
}
