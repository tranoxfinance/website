import type { Metadata } from "next";
import { formatLongDate } from "@/lib/dates";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Pager } from "@/components/Pager";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPublishedArticles } from "@/lib/articles";
import { PageHero } from "@/components/PageHero";
import { Pill } from "@/components/ui/Pill";

const PAGE_SIZE = 9;

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


export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.newsPage;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const { items: articles, total } = await getPublishedArticles(page, PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const featured = page === 1 ? articles[0] : undefined;
  const rest = featured ? articles.slice(1) : articles;

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} overlay />
      <main className="flex-1">
        <PageHero tag={t.tag} title={t.heading} sub={t.sub} photo={t.photo} />

        <section className="pb-16 pt-12 sm:pb-24 sm:pt-16">
          <Container>
            {articles.length === 0 ? (
              <p className="rounded-3xl bg-surface p-10 text-center text-ink-soft">{t.empty}</p>
            ) : (
              <>
                {featured ? (
                  <Link
                    href={`/${lang}/news/${featured.slug}`}
                    className="group grid overflow-hidden rounded-3xl bg-surface lg:grid-cols-[1.25fr_1fr]"
                  >
                    <div className="aspect-[16/9] self-center overflow-hidden bg-surface-strong">
                      {featured.coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featured.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                      <div className="flex flex-wrap items-center gap-3">
                        <Pill>{t.latest}</Pill>
                        <span className="text-sm text-ink-soft">
                          {t.categories[featured.category]} · {formatLongDate(featured.publishedAt, lang)}
                        </span>
                      </div>
                      <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
                        {featured.title}
                      </h2>
                      {featured.excerpt ? (
                        <p className="mt-4 line-clamp-3 text-lg leading-relaxed text-ink-soft">
                          {featured.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-6 inline-flex items-center gap-1.5 font-semibold text-ink">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                ) : null}

                {rest.length > 0 ? (
                  <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {rest.map((article) => (
                      <Link
                        key={article.slug}
                        href={`/${lang}/news/${article.slug}`}
                        className="group flex flex-col"
                      >
                        <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-surface">
                          {article.coverImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={article.coverImageUrl}
                              alt=""
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                            />
                          ) : null}
                        </div>
                        <span className="mt-5 text-sm text-ink-soft">
                          {t.categories[article.category]} · {formatLongDate(article.publishedAt, lang)}
                        </span>
                        <h2 className="mt-2 text-xl font-bold leading-snug tracking-tight text-ink group-hover:underline">
                          {article.title}
                        </h2>
                        {article.excerpt ? (
                          <p className="mt-2 line-clamp-2 leading-relaxed text-ink-soft">
                            {article.excerpt}
                          </p>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </>
            )}
            <Pager
              page={page}
              pageCount={pageCount}
              basePath={`/${lang}/news`}
              labelPrevious={t.pagerPrevious}
              labelNext={t.pagerNext}
              labelPageTemplate={t.pagerPage}
            />
          </Container>
        </section>

      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
