import type { Locale } from "@/i18n/config";

const dictionaries = {
  "en-NG": () => import("./dictionaries/en-NG.json").then((m) => m.default),
  "fr-CI": () => import("./dictionaries/fr-CI.json").then((m) => m.default),
} satisfies Record<Locale, () => Promise<unknown>>;

export type Dictionary = Awaited<
  ReturnType<(typeof dictionaries)["en-NG"]>
>;

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]() as Promise<Dictionary>;
}
