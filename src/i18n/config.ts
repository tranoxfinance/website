export const locales = ["en-NG", "fr-CI"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-NG";

export const localeCookieName = "NEXT_LOCALE";

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localeAlternates(path: string) {
  const suffix = path === "/" ? "" : path;
  return {
    canonical: `/${defaultLocale}${suffix}`,
    languages: {
      "en-NG": `/en-NG${suffix}`,
      "fr-CI": `/fr-CI${suffix}`,
      "x-default": `/${defaultLocale}${suffix}`,
    },
  };
}
