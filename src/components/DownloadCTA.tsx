"use client";

import { motion } from "framer-motion";

export default function DownloadCTA() {
  return (
    <section id="download" className="py-24 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#111111] border border-white/5 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(200,255,0,0.08),transparent)]" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#C8FF00] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-black font-black text-2xl">T</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Start Sending Today
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
              Download Tranox and send your first transfer in under two minutes.
              Available on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">Download on the</p>
                  <p className="text-sm font-semibold leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 bg-white text-black px-6 py-3.5 rounded-2xl hover:bg-gray-100 transition-colors justify-center"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.63.24.97.21l13.1-7.35-2.83-2.83-11.24 9.97zM.32 1.5C.12 1.83 0 2.24 0 2.72v18.56c0 .48.12.89.32 1.22l.07.06 10.4-10.4v-.25L.39 1.44l-.07.06zM20.8 10.27l-2.85-1.6-3.18 3.18 3.18 3.18 2.87-1.61c.82-.46.82-1.21-.02-1.75zM4.15.24l13.1 7.35-2.83 2.83L3.18.45A1.2 1.2 0 0 1 4.15.24z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-gray-500">GET IT ON</p>
                  <p className="text-sm font-semibold leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
