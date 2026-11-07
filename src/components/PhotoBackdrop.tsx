import Image from "next/image";
import { blurProps } from "@/lib/blurData";

interface PhotoBackdropProps {
  src: string;
  alt: string;
  priority?: boolean;
  topFade?: boolean;
}

export function PhotoBackdrop({ src, alt, priority = false, topFade = false }: PhotoBackdropProps) {
  return (
    <>
      <div className="absolute inset-0 -z-20 lg:left-[38%]">
        <Image
          src={src}
          {...blurProps(src)}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[center_30%]"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-30% via-navy/65 to-navy/5 lg:bg-gradient-to-r lg:from-navy lg:from-38% lg:via-navy/35 lg:via-48% lg:to-transparent lg:to-60%"
      />
      {topFade ? (
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy/80 to-transparent"
        />
      ) : null}
    </>
  );
}
