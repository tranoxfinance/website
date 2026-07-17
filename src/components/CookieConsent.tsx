"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getConsent, setConsent } from "@/lib/cookie-consent";

interface CookieConsentProps {
  lang: Locale;
  dict: Dictionary["cookieConsent"];
}

export function CookieConsent({ lang, dict }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function handleChoice(value: "accepted" | "declined") {
    setConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={dict.ariaLabel}
      className="fixed inset-x-0 bottom-[4.75rem] z-50 px-4 pb-4 lg:bottom-0 lg:px-6 lg:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-surface/95 p-5 shadow-soft backdrop-blur-lg sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-ink-soft">
          {dict.message}{" "}
          <a
            href={`/${lang}/privacy#cookies`}
            className="font-medium text-brand underline underline-offset-2"
          >
            {dict.policyLabel}
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => handleChoice("declined")}
            className="rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:text-ink cursor-pointer"
          >
            {dict.decline}
          </button>
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white shadow-soft transition active:translate-y-px cursor-pointer"
          >
            {dict.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
