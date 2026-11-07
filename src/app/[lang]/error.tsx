"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RotateCw } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ArrowSubmit } from "@/components/ui/ArrowButton";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1];
  const locale = hasLocale(segment) ? segment : defaultLocale;
  const [copy, setCopy] = useState<Dictionary["errorPage"] | null>(null);

  useEffect(() => {
    let active = true;
    getDictionary(locale).then((dict) => {
      if (active) setCopy(dict.errorPage);
    });
    return () => {
      active = false;
    };
  }, [locale]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <Logo href={`/${locale}`} />
      {copy ? (
        <>
          <DisplayHeading as="h1" title={copy.heading} sub={copy.body} align="center" className="mt-10" />
          <div className="mt-10 flex flex-col items-center gap-5">
            <ArrowSubmit type="button" onClick={reset} icon={RotateCw} motion="turn">
              {copy.retry}
            </ArrowSubmit>
            <Link href={`/${locale}`} className="text-md font-semibold text-ink-soft transition hover:text-ink">
              {copy.home}
            </Link>
          </div>
        </>
      ) : null}
    </main>
  );
}
