import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/Reveal";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface PageCtaProps {
  lang: Locale;
  dict: Dictionary["pageCta"];
}

export function PageCta({ lang, dict }: PageCtaProps) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy">
          <div className="absolute inset-0 -z-10 lg:left-[38%]">
            <Image
              src={dict.photo.src}
              alt={dict.photo.alt}
              fill
              sizes="(min-width: 1024px) 62vw, 100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-30% via-navy/70 to-transparent lg:bg-gradient-to-r lg:from-navy lg:from-38% lg:via-navy/40 lg:via-48% lg:to-transparent lg:to-60%"
          />
          <div className="flex min-h-[30rem] flex-col justify-end p-8 text-white sm:p-12 lg:min-h-[36rem] lg:max-w-2xl lg:p-16">
            <h2 className="text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              {dict.heading}
            </h2>
            <p className="mt-6 max-w-md text-lg font-semibold leading-relaxed text-white/90">
              {dict.sub}
            </p>
            <Button
              href={`/${lang}#get-started`}
              variant="secondary"
              size="lg"
              className="mt-8 self-start rounded-full"
            >
              {dict.button}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
