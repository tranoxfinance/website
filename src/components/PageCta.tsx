import { Button } from "@/components/ui/Button";
import { PhotoBanner } from "@/components/PhotoBanner";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface PageCtaProps {
  lang: Locale;
  dict: Dictionary["pageCta"];
}

export function PageCta({ lang, dict }: PageCtaProps) {
  return (
    <PhotoBanner title={dict.heading} sub={dict.sub} photo={dict.photo}>
      <Button
        href={`/${lang}#get-started`}
        variant="secondary"
        size="lg"
        className="mt-8 self-start rounded-full"
      >
        {dict.button}
      </Button>
    </PhotoBanner>
  );
}
