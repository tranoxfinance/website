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
      <div className="-mx-8 -mt-8 -rotate-2 bg-green py-4 shadow-lift sm:-mt-12 sm:py-6">
        <div className="flex w-max animate-marquee-fast">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center whitespace-nowrap font-display text-3xl leading-none text-navy sm:text-5xl"
            >
              <li className="flex items-center">
                <span className="flex items-center gap-3 px-6 sm:gap-4 sm:px-10">
                  <Flag country="NG" className="h-9 w-9 ring-2 ring-navy sm:h-12 sm:w-12" />
                  NGN ⇄ XOF
                  <Flag country="CI" className="h-9 w-9 ring-2 ring-navy sm:h-12 sm:w-12" />
                </span>
                <span aria-hidden className="text-navy">
                  ●
                </span>
              </li>
              <li className="flex items-center">
                <span className="flex items-center gap-2 px-6 sm:gap-3 sm:px-10">
                  {PAYOUT_NETWORKS.map((network) => (
                    <span
                      key={network.name}
                      className={cn(
                        "flex h-11 items-center rounded-lg px-3 sm:h-14 sm:px-4",
                        network.tile,
                      )}
                    >
                      <Image
                        src={network.src}
                        alt={copy === 0 ? network.name : ""}
                        width={network.width}
                        height={network.height}
                        unoptimized
                        className="h-6 w-auto sm:h-8"
                      />
                    </span>
                  ))}
                </span>
                <span aria-hidden className="text-navy">
                  ●
                </span>
              </li>
              {items.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="px-6 sm:px-10">{item}</span>
                  <span aria-hidden className="text-navy">
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
