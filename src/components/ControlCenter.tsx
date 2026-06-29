"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, SendHorizonal, Wallet, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description: "View balances, live FX rates, and transfer history at a glance.",
  },
  {
    icon: SendHorizonal,
    title: "Instant Transfers",
    description: "Send NGN to XOF in seconds with real-time confirmation.",
  },
  {
    icon: Wallet,
    title: "Mobile Money & Bank",
    description: "Pay to any Nigerian bank or Ivorian Orange Money, MTN, Moov wallet.",
  },
  {
    icon: ShieldCheck,
    title: "KYC & Compliance",
    description: "Didit-verified identity with tiered limits and full CBN/BCEAO compliance.",
  },
];

function DualPhone() {
  return (
    <div className="relative w-full h-[480px] flex items-center justify-center">
      <div className="absolute right-16 top-4 w-[200px] h-[400px] bg-[#141414] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden z-20">
        <div className="px-5 pt-7">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-5 h-5 bg-[#C8FF00] rounded-full flex items-center justify-center">
              <span className="text-black font-black text-[9px]">T</span>
            </div>
            <span className="text-white text-sm font-bold">Tranox</span>
          </div>
          <p className="text-gray-500 text-[10px]">Current balance</p>
          <p className="text-white text-2xl font-bold mt-0.5">₦150,000</p>
          <div className="flex gap-2 mt-3">
            <button className="flex-1 bg-[#C8FF00] text-black text-[10px] font-bold py-2 rounded-xl">Send</button>
            <button className="flex-1 border border-white/10 text-white text-[10px] py-2 rounded-xl">Received</button>
          </div>
        </div>
        <div className="px-5 mt-4">
          <div className="flex justify-between mb-2">
            <p className="text-white text-[11px] font-semibold">Transactions</p>
            <p className="text-[#C8FF00] text-[10px]">See All</p>
          </div>
          {["Kofi A.", "Amara D.", "Felix O.", "James K."].map((name, i) => (
            <div key={name} className="flex justify-between items-center py-1.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/10" />
                <p className="text-white text-[10px]">{name}</p>
              </div>
              <p className="text-gray-400 text-[10px]">{i % 2 === 0 ? "-XOF 19K" : "+₦50K"}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute left-8 top-12 w-[190px] h-[360px] bg-[#141414] rounded-[2.5rem] border border-white/8 shadow-xl overflow-hidden z-10">
        <div className="px-4 pt-7 pb-3">
          <div className="flex items-center gap-1 mb-3">
            <span className="text-white/50 text-[10px]">←</span>
            <p className="text-white text-[11px] font-semibold">Contact List</p>
          </div>
          <div className="bg-white/5 rounded-lg px-3 py-1.5 mb-3">
            <p className="text-gray-600 text-[9px]">Search Contact</p>
          </div>
          <div className="flex gap-2 mb-3">
            {["Contacts", "Favourites", "Recent"].map((tab, i) => (
              <button
                key={tab}
                className={`text-[9px] px-2 py-0.5 rounded-full ${i === 0 ? "bg-[#C8FF00] text-black font-bold" : "text-gray-500"}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {["Alfonso S.", "Phillip K.", "Angel G.", "Eduardo R.", "James K."].map((name) => (
            <div key={name} className="flex items-center gap-2 py-1.5 border-b border-white/5">
              <div className="w-6 h-6 rounded-full bg-white/10 shrink-0" />
              <div>
                <p className="text-white text-[10px]">{name}</p>
                <p className="text-gray-600 text-[8px]">{name.toLowerCase().replace(" ", "")}@gmail.com</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ControlCenter() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-10">
            Your Transfer Control
            <br />
            Center For Everything
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 bg-[#C8FF00]/10 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#C8FF00]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DualPhone />
        </motion.div>
      </div>
    </section>
  );
}
