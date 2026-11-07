import Image from "next/image";
import { Flag } from "@/components/Flag";
import { PAYOUT_NETWORKS } from "@/components/PayoutLogos";
import { cn } from "@/lib/utils";

interface FactBandProps {
  items: string[];
  label: string;
}

export function FactBand({ items, label }: FactBandProps) {
  return (
    <section aria-label={label} className="relative z-10 overflow-x-clip">
      <div className="-mx-8 -mt-6 -rotate-1 bg-brand-soft py-3 sm:-mt-8 sm:py-4">
        <div className="flex w-max animate-marquee-fast">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center whitespace-nowrap font-display text-2xl leading-none text-navy sm:text-3xl"
            >
              <li className="flex items-center">
                <span className="flex items-center gap-3 px-6 sm:gap-4 sm:px-10">
                  <Flag country="NG" className="h-7 w-7 sm:h-8 sm:w-8" />
                  NGN ⇄ XOF
                  <Flag country="CI" className="h-7 w-7 sm:h-8 sm:w-8" />
                </span>
                <span aria-hidden className="text-brand">
                  ●
                </span>
              </li>
              <li className="flex items-center">
                <span className="flex items-center gap-2 px-6 sm:gap-3 sm:px-10">
                  {PAYOUT_NETWORKS.map((network) => (
                    <span
                      key={network.name}
                      className={cn(
                        "flex h-9 items-center rounded-lg px-3 sm:h-11",
                        network.tile,
                      )}
                    >
                      <Image
                        src={network.src}
                        alt={copy === 0 ? network.name : ""}
                        width={network.width}
                        height={network.height}
                        unoptimized
                        className="h-5 w-auto sm:h-6"
                      />
                    </span>
                  ))}
                </span>
                <span aria-hidden className="text-brand">
                  ●
                </span>
              </li>
              {items.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="px-6 sm:px-10">{item}</span>
                  <span aria-hidden className="text-brand">
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
