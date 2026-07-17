"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getConsent, subscribeToConsent } from "@/lib/cookie-consent";

function isAccepted() {
  return getConsent() === "accepted";
}

export function Analytics({ gaId }: { gaId?: string }) {
  const accepted = useSyncExternalStore(
    subscribeToConsent,
    isAccepted,
    () => false,
  );

  if (!gaId || !accepted) return null;

  return <GoogleAnalytics gaId={gaId} />;
}
