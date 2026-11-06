import { PhotoBanner } from "@/components/PhotoBanner";
import { StoreBadges } from "@/components/StoreBadges";
import type { Dictionary } from "@/i18n/dictionaries";

interface CtaBannerProps {
  dict: Dictionary["cta"];
  badges: Dictionary["storeBadges"];
}

export function CtaBanner({ dict, badges }: CtaBannerProps) {
  return (
    <PhotoBanner
      id="get-started"
      tag={dict.tag}
      title={dict.heading}
      sub={dict.body}
      photo={dict.photo}
    >
      <StoreBadges dict={badges} invert className="mt-8" />
    </PhotoBanner>
  );
}
