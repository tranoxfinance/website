"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#C8FF00] rounded-full flex items-center justify-center">
            <span className="text-black font-black text-sm">T</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Tranox</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#download"
            className="hidden md:inline-flex bg-[#C8FF00] text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#d9ff33] transition-colors"
          >
            Download App
          </Link>
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#080808]/95 backdrop-blur-md border-b border-white/5 px-6 py-4 flex flex-col gap-4"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#download"
            onClick={() => setMobileOpen(false)}
            className="inline-flex w-fit bg-[#C8FF00] text-black text-sm font-semibold px-5 py-2 rounded-full"
          >
            Download App
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
