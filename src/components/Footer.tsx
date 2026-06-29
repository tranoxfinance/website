import Link from "next/link";

const links = {
  Product: ["Features", "How It Works", "Pricing", "Security"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help Centre", "Contact", "Privacy Policy", "Terms of Service"],
};

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-[#C8FF00] rounded-full flex items-center justify-center">
                <span className="text-black font-black text-sm">T</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">Tranox</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The fastest way to send money between Nigeria and Côte d&apos;Ivoire.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-white text-sm font-semibold mb-4">{category}</p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-gray-500 text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Tranox. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Nigeria &bull; Côte d&apos;Ivoire
          </p>
        </div>
      </div>
    </footer>
  );
}
