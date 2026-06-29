"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft } from "lucide-react";

function CTAPhone() {
  return (
    <div className="relative w-full h-[360px] flex items-center justify-end pr-8">
      <div className="absolute right-20 top-0 w-[180px] h-[340px] bg-[#0d0d0d] rounded-[2.2rem] border border-white/10 shadow-2xl overflow-hidden z-20">
        <div className="px-4 pt-6">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-[9px]">T</span>
            </div>
            <span className="text-white text-sm font-bold">Tranox</span>
          </div>
          <p className="text-gray-500 text-[10px]">Current balance</p>
          <p className="text-white text-xl font-bold mt-0.5">₦150,000</p>
          <p className="text-gray-600 text-[9px]">Add Balance</p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-[#C8FF00] text-black text-[9px] font-bold py-1.5 rounded-lg">Send</button>
            <button className="flex-1 border border-white/10 text-white text-[9px] py-1.5 rounded-lg">Received</button>
          </div>
          <p className="text-gray-600 text-[8px] text-center mt-1">Fees may apply</p>
        </div>
        <div className="px-4 mt-3">
          <div className="flex justify-between mb-2">
            <p className="text-white text-[10px] font-semibold">Transactions</p>
            <p className="text-[#C8FF00] text-[9px]">See All</p>
          </div>
          {["Kofi A.", "Amara D.", "Felix O."].map((name, i) => (
            <div key={name} className="flex justify-between py-1.5 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/10" />
                <p className="text-white text-[9px]">{name}</p>
              </div>
              <p className="text-gray-400 text-[9px]">{i % 2 === 0 ? "-XOF 19K" : "+₦50K"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-4 top-10 w-[160px] h-[300px] bg-[#141414] rounded-[2rem] border border-white/8 shadow-xl overflow-hidden z-10">
        <div className="px-4 pt-6">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-white/50 text-[9px]">←</span>
            <p className="text-white text-[10px] font-semibold">Send Money</p>
          </div>
          <div className="space-y-2">
            <div className="bg-[#1a1a1a] rounded-lg p-2.5">
              <p className="text-gray-500 text-[8px]">You Send</p>
              <div className="flex justify-between mt-0.5">
                <span className="text-white text-xs font-bold">₦50,000</span>
                <span className="text-[#C8FF00] text-[8px]">NGN</span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
                <ArrowRightLeft className="w-2.5 h-2.5 text-black" />
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-lg p-2.5">
              <p className="text-gray-500 text-[8px]">Recipient Gets</p>
              <div className="flex justify-between mt-0.5">
                <span className="text-white text-xs font-bold">XOF 38K</span>
                <span className="text-[#C8FF00] text-[8px]">XOF</span>
              </div>
            </div>
            <button className="w-full bg-[#C8FF00] text-black text-[9px] font-bold py-2 rounded-lg mt-1">
              Confirm Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DownloadCTA() {
  return (
    <section id="download" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] border border-white/5 rounded-3xl overflow-hidden grid lg:grid-cols-2"
        >
          <div className="p-12 flex flex-col justify-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Take Control of Your
              <br />
              Money Today
            </h2>
            <p className="text-gray-400 text-sm mt-4 max-w-sm leading-relaxed">
              Join thousands of users who send money smarter between Nigeria and Côte d&apos;Ivoire with one powerful app.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href="#"
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
                href="#"
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
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#C8FF00]/5 to-transparent overflow-hidden">
            <CTAPhone />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
