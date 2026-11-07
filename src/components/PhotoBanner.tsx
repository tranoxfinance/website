import { PhotoBackdrop } from "@/components/PhotoBackdrop";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";

interface PhotoBannerProps {
  id?: string;
  title: string;
  sub: string;
  photo: { src: string; alt: string };
  children?: React.ReactNode;
}

export function PhotoBanner({ id, title, sub, photo, children }: PhotoBannerProps) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-panel bg-navy">
          <PhotoBackdrop src={photo.src} alt={photo.alt} />
          <div className="flex min-h-128 flex-col justify-end p-8 text-white sm:p-12 lg:min-h-144 lg:max-w-2xl lg:p-16">
            <DisplayHeading title={title} sub={sub} size="xl" invert />
            {children}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
