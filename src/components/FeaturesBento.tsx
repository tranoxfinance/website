"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, TrendingUp, Zap, ShieldCheck, Smartphone } from "lucide-react";

function MiniPhone() {
  return (
    <div className="w-[140px] h-[240px] bg-[#0d0d0d] rounded-[1.8rem] border border-white/10 overflow-hidden mx-auto">
      <div className="px-4 pt-5 pb-2">
        <p className="text-gray-500 text-[9px]">Sending</p>
        <p className="text-white text-lg font-bold">₦50,000</p>
      </div>
      <div className="flex justify-center my-1">
        <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
          <ArrowRightLeft className="w-2.5 h-2.5 text-black" />
        </div>
      </div>
      <div className="px-4 py-2 bg-[#1a1a1a] mx-3 rounded-xl">
        <p className="text-gray-500 text-[9px]">Recipient Gets</p>
        <p className="text-white text-sm font-bold">XOF 38,000</p>
      </div>
      <button className="mx-3 mt-2 w-[calc(100%-24px)] bg-[#C8FF00] text-black text-[9px] font-bold py-2 rounded-lg">
        Send Money
      </button>
    </div>
  );
}

function ConfirmPhone() {
  return (
    <div className="flex gap-2 items-end">
      <div className="w-[110px] h-[190px] bg-[#0d0d0d] rounded-[1.5rem] border border-white/10 overflow-hidden flex flex-col">
        <div className="px-3 pt-4">
          <p className="text-gray-500 text-[9px]">Transfer ID</p>
          <p className="text-white text-[10px] font-mono">TRX-4089561</p>
        </div>
        <div className="px-3 mt-2">
          <p className="text-gray-500 text-[9px]">From</p>
          <p className="text-white text-[10px]">Chidi — ₦50K</p>
        </div>
        <div className="px-3 mt-2">
          <p className="text-gray-500 text-[9px]">To</p>
          <p className="text-white text-[10px]">Kofi — XOF 38K</p>
        </div>
        <div className="px-3 mt-2">
          <p className="text-gray-500 text-[9px]">Fee</p>
          <p className="text-[#C8FF00] text-[10px] font-semibold">Free</p>
        </div>
      </div>
      <div className="w-[100px] h-[160px] bg-[#111] rounded-[1.5rem] border border-white/8 overflow-hidden flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-[#C8FF00]/20 border border-[#C8FF00]/30 flex items-center justify-center mb-2">
          <ShieldCheck className="w-5 h-5 text-[#C8FF00]" />
        </div>
        <p className="text-white text-[10px] font-semibold text-center px-2">Transfer Confirmed</p>
        <button className="mt-2 bg-[#C8FF00] text-black text-[9px] font-bold px-3 py-1 rounded-full">
          Done
        </button>
      </div>
    </div>
  );
}

export default function FeaturesBento() {
  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Your Cross-Border Transfer,
            <br />
            Simplified
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm">
            From initiating a transfer to confirming delivery, Tranox brings everything into one fast, intuitive experience — designed for speed, clarity, and security.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.0 }}
            className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-4 py-6">
              <div className="w-12 h-12 bg-[#C8FF00]/10 border border-[#C8FF00]/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#C8FF00]" />
              </div>
              <ArrowRightLeft className="w-5 h-5 text-gray-600" />
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-gray-400" />
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">All Your Transfers, One View</h3>
              <p className="text-gray-500 text-sm mt-1">Check balances, live rates, and recent transfers from a single intuitive dashboard.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-end justify-center gap-1 py-4 h-28">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className={`w-6 rounded-t-md ${i === 5 ? "bg-[#C8FF00]" : "bg-white/10"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Live Exchange Rates</h3>
              <p className="text-gray-500 text-sm mt-1">Track NGN/XOF rates in real time and lock the rate for 30 seconds at transfer confirmation.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#C8FF00] rounded-2xl p-6 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-black/60" />
              <span className="text-black/40 text-6xl font-black leading-none">30s</span>
            </div>
            <div>
              <h3 className="text-black font-bold text-xl">Transfer Speed</h3>
              <p className="text-black/70 text-sm mt-1">Money delivered in under 30 seconds from initiation to recipient.</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex justify-center py-4">
              <MiniPhone />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Send NGN, Receive XOF</h3>
              <p className="text-gray-500 text-sm mt-1">Enter your amount and see the exact XOF amount your recipient gets — no surprises.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex justify-center py-4">
              <ConfirmPhone />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Instant Confirmation</h3>
              <p className="text-gray-500 text-sm mt-1">Real-time webhook confirmations mean both sender and recipient know the moment funds arrive.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
