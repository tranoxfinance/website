"use client";

import { useState, useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getConsent, setConsent, subscribeToConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

interface CookieConsentProps {
  lang: Locale;
  dict: Dictionary["cookieConsent"];
}

function isUndecided() {
  return getConsent() === undefined;
}

export function CookieConsent({ lang, dict }: CookieConsentProps) {
  const visible = useSyncExternalStore(subscribeToConsent, isUndecided, () => false);
  const [managing, setManaging] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  function handleChoice(value: "accepted" | "declined") {
    setConsent(value);
  }

  function handleSavePreferences() {
    setConsent(analyticsEnabled ? "accepted" : "declined");
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={dict.ariaLabel}
      className="fixed inset-x-0 bottom-[4.75rem] z-50 px-4 pb-4 lg:bottom-0 lg:px-6 lg:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface/95 p-5 shadow-soft backdrop-blur-lg">
        {managing ? (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-ink">{dict.manage.heading}</h2>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{dict.manage.essential.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {dict.manage.essential.description}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-brand opacity-50"
              >
                <span className="inline-block h-5 w-5 translate-x-5 rounded-full bg-white" />
              </span>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={analyticsEnabled}
              onClick={() => setAnalyticsEnabled((value) => !value)}
              className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3 text-left transition hover:border-brand/40 cursor-pointer"
            >
              <div>
                <p className="text-sm font-medium text-ink">{dict.manage.analytics.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-soft">
                  {dict.manage.analytics.description}
                </p>
              </div>
              <span
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition",
                  analyticsEnabled ? "bg-brand" : "bg-border",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-5 w-5 rounded-full bg-white transition",
                    analyticsEnabled ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </span>
            </button>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setManaging(false)}
                className="rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:text-ink cursor-pointer"
              >
                {dict.manage.back}
              </button>
              <button
                type="button"
                onClick={handleSavePreferences}
                className="rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white shadow-soft transition active:translate-y-px cursor-pointer"
              >
                {dict.manage.save}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-ink-soft">
              {dict.message}{" "}
              <a
                href={`/${lang}/privacy#cookies`}
                className="font-medium text-brand underline underline-offset-2"
              >
                {dict.policyLabel}
              </a>
            </p>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setManaging(true)}
                className="rounded-xl px-4 py-2 text-sm font-medium text-ink-soft transition hover:text-ink cursor-pointer"
              >
                {dict.customize}
              </button>
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
        )}
      </div>
    </div>
  );
}
