import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Stamp } from "@/components/ui/Stamp";
import { Reveal } from "@/components/Reveal";

interface PhotoBannerProps {
  id?: string;
  tag?: string;
  title: string;
  sub: string;
  photo: { src: string; alt: string };
  children?: React.ReactNode;
}

export function PhotoBanner({ id, tag, title, sub, photo, children }: PhotoBannerProps) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy">
          <div className="absolute inset-0 -z-10 lg:left-[38%]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-30% via-navy/70 to-transparent lg:bg-gradient-to-r lg:from-navy lg:from-38% lg:via-navy/40 lg:via-48% lg:to-transparent lg:to-60%"
          />
          <div className="flex min-h-[32rem] flex-col justify-end p-8 text-white sm:p-12 lg:min-h-[36rem] lg:max-w-2xl lg:p-16">
            {tag ? <Stamp className="self-start">{tag}</Stamp> : null}
            <h2 className="mt-6 font-display text-6xl uppercase leading-[0.95] sm:text-7xl lg:text-8xl">
              {title}
            </h2>
            <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-white/90">
              {sub}
            </p>
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
