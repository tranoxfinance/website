import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Pill } from "@/components/ui/Pill";
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
    <section className="pt-3 sm:pt-6">
      <Container>
        <div
          className={cn(
            "grid overflow-hidden rounded-[2rem] bg-navy text-white",
            photo && "lg:grid-cols-[1.15fr_0.85fr]",
          )}
        >
          <div
            className={cn(
              "flex animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both] flex-col justify-center p-8 sm:p-12 lg:p-16",
              photo ? "lg:py-20" : "lg:py-24",
            )}
          >
            <Pill invert className="self-start">
              {tag}
            </Pill>
            <h1
              className={cn(
                "mt-6 font-bold leading-[0.98] tracking-[-0.035em]",
                photo
                  ? "text-5xl sm:text-6xl lg:text-7xl"
                  : "max-w-5xl text-5xl sm:text-7xl lg:text-8xl",
              )}
            >
              {title}
            </h1>
            {sub ? (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
                {sub}
              </p>
            ) : null}
            {children}
          </div>
          {photo ? (
            <div className="relative aspect-[4/3] bg-navy lg:aspect-auto lg:min-h-[38rem]">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
