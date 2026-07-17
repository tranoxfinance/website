const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const CONSENT_EVENT = "cookieconsentchange";

export type ConsentValue = "accepted" | "declined";

export function getConsent(): ConsentValue | undefined {
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return value === "accepted" || value === "declined" ? value : undefined;
}

export function setConsent(value: ConsentValue) {
  document.cookie = `${COOKIE_NAME}=${value};path=/;max-age=${COOKIE_MAX_AGE};samesite=lax`;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function subscribeToConsent(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
