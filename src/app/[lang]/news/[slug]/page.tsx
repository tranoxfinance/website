import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { hasLocale, localeAlternates, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getArticleBySlug } from "@/lib/articles";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const article = await getArticleBySlug(slug);
  return {
    title: article ? `${article.title} — Tranox` : dict.newsPage.metaTitle,
    description: article?.excerpt ?? dict.newsPage.metaDescription,
    alternates: localeAlternates(lang, `/news/${slug}`),
    openGraph: article?.coverImageUrl
      ? { images: [{ url: article.coverImageUrl }] }
      : undefined,
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

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.newsPage;
  const article = await getArticleBySlug(slug);
  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <article className="py-14 sm:py-16">
          <Container className="max-w-3xl">
            <Link
              href={`/${lang}/news`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToNews}
            </Link>

            <div className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand">
              <span>{t.categories[article.category]}</span>
              <span className="font-normal normal-case tracking-normal text-muted">
                {formatDate(article.publishedAt, lang)}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                {article.excerpt}
              </p>
            ) : null}

            {article.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.coverImageUrl}
                alt=""
                className="mt-8 w-full rounded-3xl border border-border object-cover"
              />
            ) : null}

            <div
              className={cn(
                "mt-8 text-[15px] leading-relaxed text-ink-soft",
                "[&_h1]:mb-3 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-ink [&_h1]:first:mt-0",
                "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:first:mt-0",
                "[&_p]:mb-4 [&_p]:last:mb-0",
                "[&_strong]:font-semibold [&_strong]:text-ink",
              )}
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {article.media.length > 0 ? (
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {article.media.map((item) =>
                  item.mediaType === "video" ? (
                    <video
                      key={item.id}
                      src={item.url}
                      controls
                      className="w-full rounded-2xl border border-border"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={item.id}
                      src={item.url}
                      alt=""
                      className="w-full rounded-2xl border border-border object-cover"
                    />
                  ),
                )}
              </div>
            ) : null}
          </Container>
        </article>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
