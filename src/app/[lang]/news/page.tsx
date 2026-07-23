import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { hasLocale, localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedArticles } from "@/lib/articles";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return {
    title: dict.newsPage.metaTitle,
    description: dict.newsPage.metaDescription,
    alternates: localeAlternates(lang, "/news"),
  };
}

function formatDate(value: string | null, lang: Locale): string {
  if (!value) return "";
  return new Intl.DateTimeFormat(lang, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.newsPage;
  const articles = await getPublishedArticles();

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {t.tag}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.heading}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">
              {t.sub}
            </p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-5xl">
            {articles.length === 0 ? (
              <p className="rounded-3xl border border-border bg-card p-9 text-center text-ink-soft">
                {t.empty}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/${lang}/news/${article.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition hover:border-brand"
                  >
                    {article.coverImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={article.coverImageUrl}
                        alt=""
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <div className="aspect-[16/9] w-full bg-surface" />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand">
                        <span>{t.categories[article.category]}</span>
                        <span className="font-normal normal-case tracking-normal text-muted">
                          {formatDate(article.publishedAt, lang)}
                        </span>
                      </div>
                      <h2 className="mt-2 text-lg font-bold text-ink group-hover:text-brand">
                        {article.title}
                      </h2>
                      {article.excerpt ? (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                          {article.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-brand">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
