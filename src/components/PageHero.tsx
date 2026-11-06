import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface PageHeroPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PageHeroProps {
  tag: string;
  title: string;
  sub?: string;
  photo?: PageHeroPhoto;
  children?: React.ReactNode;
}

export function PageHero({ tag, title, sub, photo, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {photo ? (
        <>
          <div className="absolute inset-0 -z-20 lg:left-[36%]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 64vw, 100vw"
              className="object-cover object-[center_30%]"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-navy from-25% via-navy/60 to-navy/5 lg:bg-gradient-to-r lg:from-navy lg:from-36% lg:via-navy/30 lg:via-46% lg:to-transparent lg:to-60%"
          />
        </>
      ) : null}

      <Container
        className={cn(
          "flex flex-col justify-end pb-24 sm:pb-28",
          photo ? "min-h-[40rem] pt-56 sm:min-h-[46rem] lg:pt-24" : "pt-20 sm:pt-28",
        )}
      >
        <div className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          <span className="inline-block -rotate-3 bg-green px-4 py-2 font-display text-xl uppercase leading-none text-navy sm:text-2xl">
            {tag}
          </span>
          <h1 className="mt-6 max-w-4xl font-display text-[3.4rem] uppercase leading-[1.16] text-white sm:text-7xl sm:leading-[1.14] lg:text-8xl lg:leading-[1.12]">
            <span className="box-decoration-clone bg-navy px-3 sm:px-5">{title}</span>
          </h1>
          {sub ? (
            <p className="mt-6 max-w-xl bg-navy/85 p-4 text-lg font-semibold leading-relaxed text-white sm:p-5 sm:text-xl">
              {sub}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
