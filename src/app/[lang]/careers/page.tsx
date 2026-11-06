import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Pager } from "@/components/Pager";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOpenJobs } from "@/lib/careers";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

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
    title: dict.careersPage.metaTitle,
    description: dict.careersPage.metaDescription,
    alternates: localeAlternates(lang, "/careers"),
  };
}

export default async function CareersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.careersPage;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1);
  const { items: jobs, total } = await getOpenJobs(page, PAGE_SIZE);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <PageHero tag={t.tag} title={t.heading} sub={t.sub} photo={t.photo}>
          <p className="mt-10 flex items-baseline gap-3">
            <span className="tabular text-7xl font-bold leading-none tracking-[-0.04em] sm:text-8xl">
              {total}
            </span>
            <span className="text-lg font-semibold text-white/80">{t.openRolesCount}</span>
          </p>
        </PageHero>

        <section className="py-16 sm:py-24">
          <Container>
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-4xl font-bold tracking-[-0.03em] text-ink sm:text-6xl">
                {t.openRoles}
              </h2>
            </Reveal>
            {jobs.length === 0 ? (
              <p className="mt-10 rounded-3xl bg-surface p-10 text-center text-lg text-ink-soft">
                {t.empty}
              </p>
            ) : (
              <ul className="mt-10 border-t border-ink">
                {jobs.map((job) => (
                  <li key={job.id} className="border-b border-border-strong">
                    <Link
                      href={`/${lang}/careers/${job.slug}`}
                      className="group -mx-4 flex items-center justify-between gap-6 rounded-3xl px-4 py-8 transition-colors duration-300 hover:bg-navy sm:-mx-8 sm:px-8"
                    >
                      <div className="min-w-0">
                        <h3 className="text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-white sm:text-4xl">
                          {job.title}
                        </h3>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {[job.department, t.employmentTypes[job.employmentType], job.location].map((meta) => (
                            <li
                              key={meta}
                              className="rounded-full border border-border-strong px-3 py-1 text-sm font-medium text-ink-soft transition-colors group-hover:border-white/30 group-hover:text-white/85"
                            >
                              {meta}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <span
                        aria-label={t.viewRole}
                        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45 sm:h-16 sm:w-16"
                      >
                        <ArrowUpRight className="h-6 w-6" strokeWidth={2.25} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Pager
              page={page}
              pageCount={pageCount}
              basePath={`/${lang}/careers`}
              labelPrevious={t.pagerPrevious}
              labelNext={t.pagerNext}
              labelPageTemplate={t.pagerPage}
            />
          </Container>
        </section>

        <section className="pb-16 sm:pb-24">
          <Container>
            <Reveal className="grid gap-8 rounded-[2rem] bg-brand p-8 text-white sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:p-16">
              <div>
                <h2 className="text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                  {t.openApplication.heading}
                </h2>
                <p className="mt-6 max-w-lg text-xl font-bold leading-relaxed">
                  {t.openApplication.body}
                </p>
              </div>
              <a
                href={`mailto:${t.openApplication.email}`}
                className="inline-flex h-14 items-center justify-center rounded-full bg-card px-7 text-lg font-bold text-ink transition hover:bg-surface lg:justify-self-end"
              >
                {t.openApplication.email}
              </a>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
