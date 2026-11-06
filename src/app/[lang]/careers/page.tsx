import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { Pager } from "@/components/Pager";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getOpenJobs } from "@/lib/careers";
import { PageHero } from "@/components/PageHero";
import { FactBand } from "@/components/FactBand";
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
            <span className="font-display text-8xl leading-none text-green sm:text-9xl">
              {total}
            </span>
            <span className="bg-navy px-2 py-1 font-display text-2xl uppercase text-white sm:text-3xl">{t.openRolesCount}</span>
          </p>
        </PageHero>
        <FactBand items={dict.factBand} label={t.tag} />

        <section className="py-16 sm:py-24">
          <Container>
            <Reveal className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-5xl uppercase leading-none text-ink sm:text-7xl">
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
            <Reveal className="grid gap-10 overflow-hidden rounded-[2rem] bg-navy p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16 lg:p-16">
              <div>
                <span className="inline-block -rotate-3 bg-green px-4 py-2 font-display text-xl uppercase leading-none text-navy sm:text-2xl">
                  {t.openApplication.tag}
                </span>
                <h2 className="mt-6 font-display text-6xl uppercase leading-[0.95] sm:text-7xl lg:text-8xl">
                  {t.openApplication.heading}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/85 sm:text-xl">
                  {t.openApplication.body}
                </p>
              </div>
              <div className="flex flex-col gap-4 lg:items-end">
                <a
                  href={`mailto:${t.openApplication.email}?subject=${encodeURIComponent(t.openApplication.subject)}`}
                  className="group inline-flex h-16 w-full items-center justify-between gap-4 whitespace-nowrap rounded-full bg-green pl-6 pr-2 text-lg font-bold text-navy transition hover:brightness-105 sm:w-80 sm:pl-7"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="h-5 w-5" strokeWidth={2.25} />
                    {t.openApplication.button}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                </a>
                <p className="w-full text-center text-sm text-white/70 sm:w-80">
                  {t.openApplication.email}
                </p>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
