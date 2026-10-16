import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return {
    title: dict.deleteAccount.metaTitle,
    description: dict.deleteAccount.metaDescription,
    alternates: localeAlternates(lang, "/delete-account"),
  };
}

export default async function DeleteAccountPage({
  params,
}: PageProps<"/[lang]/delete-account">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <LegalPage lang={lang} dict={dict} page={dict.deleteAccount} />;
}
