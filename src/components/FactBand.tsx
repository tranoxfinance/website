interface FactBandProps {
  items: string[];
  label: string;
}

export function FactBand({ items, label }: FactBandProps) {
  return (
    <section aria-label={label} className="relative z-10 overflow-x-clip">
      <div className="-mx-8 -mt-8 -rotate-2 bg-green py-4 shadow-lift sm:-mt-12 sm:py-6">
        <div className="flex w-max animate-marquee-fast">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center whitespace-nowrap font-display text-3xl uppercase leading-none text-navy sm:text-5xl"
            >
              {items.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="px-6 sm:px-10">{item}</span>
                  <span aria-hidden className="text-navy/40">
                    ●
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
