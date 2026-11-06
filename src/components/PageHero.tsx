import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { Stamp } from "@/components/ui/Stamp";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
  back?: { href: string; label: string };
  children?: React.ReactNode;
}

export function PageHero({ tag, title, sub, photo, back, children }: PageHeroProps) {
  return (
    <section className="relative isolate -mt-16 overflow-hidden bg-navy">
      {photo ? <PhotoBackdrop src={photo.src} alt={photo.alt} priority topFade /> : null}

      <Container
        className={cn(
          "flex flex-col justify-end pb-24 sm:pb-28",
          photo ? "min-h-[44rem] pt-72 sm:min-h-[50rem] lg:pt-40" : "pt-36 sm:pt-44",
        )}
      >
        <div className="animate-[rise_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
          {back ? (
            <Link
              href={back.href}
              className="mb-8 flex w-fit items-center gap-1.5 bg-navy px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-navy"
            >
              <ArrowLeft className="h-4 w-4" />
              {back.label}
            </Link>
          ) : null}
          <Stamp>{tag}</Stamp>
          <h1 className="mt-6 max-w-4xl font-display text-display-xs uppercase leading-boxed text-white sm:text-7xl lg:text-8xl">
            <span className="box-decoration-clone bg-navy px-3 sm:px-5">{title}</span>
          </h1>
          {sub ? (
            <p className="mt-6 max-w-xl bg-navy p-4 text-lg font-semibold leading-relaxed text-white sm:p-5 sm:text-xl">
              {sub}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  );
}
