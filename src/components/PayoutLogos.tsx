import Image from "next/image";
import { Landmark } from "lucide-react";
import { cn } from "@/lib/utils";

export const PAYOUT_NETWORKS = [
  { name: "Wave", src: "/images/payout/wave.png", width: 230, height: 101, tile: "bg-white" },
  { name: "Orange Money", src: "/images/payout/orange-money.svg", width: 431, height: 115, tile: "bg-white" },
  { name: "MTN MoMo", src: "/images/payout/mtn.svg", width: 1280, height: 640, tile: "bg-partner-mtn" },
  { name: "Moov Money", src: "/images/payout/moov.png", width: 216, height: 102, tile: "bg-navy ring-1 ring-on-dark-line" },
];

interface PayoutLogosProps {
  bankLabel: string;
  className?: string;
}

export function PayoutLogos({ bankLabel, className }: PayoutLogosProps) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2", className)}>
      {PAYOUT_NETWORKS.map((network) => (
        <li
          key={network.name}
          className={cn("flex h-16 items-center justify-center rounded-xl px-4", network.tile)}
        >
          <Image
            src={network.src}
            alt={network.name}
            width={network.width}
            height={network.height}
            unoptimized
            className="h-9 w-auto max-w-full object-contain"
          />
        </li>
      ))}
      <li className="col-span-2 flex h-14 items-center justify-center gap-2 rounded-xl bg-on-dark-fill px-4 text-sm font-semibold text-white">
        <Landmark className="h-5 w-5 shrink-0" strokeWidth={2} />
        {bankLabel}
      </li>
    </ul>
  );
}
