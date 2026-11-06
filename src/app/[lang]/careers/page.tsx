import type { Metadata } from "next";
import { Stamp } from "@/components/ui/Stamp";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock, Mail, MapPin, Users } from "lucide-react";
import { formatLongDate } from "@/lib/dates";
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
      <Navbar lang={lang} dict={dict.nav} overlay />
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
              <div className="mt-10">
                <div
                  aria-hidden
                  className="hidden grid-cols-[1fr_11rem_9rem_13rem_3.5rem] gap-6 border-b border-ink pb-3 text-xs font-bold uppercase tracking-[0.1em] text-ink-soft lg:grid"
                >
                  <span>{t.columnRole}</span>
                  <span>{t.department}</span>
                  <span>{t.type}</span>
                  <span>{t.location}</span>
                  <span />
                </div>
                <ul className="border-t border-ink lg:border-t-0">
                  {jobs.map((job) => (
                    <li key={job.id} className="border-b border-border-strong">
                      <Link
                        href={`/${lang}/careers/${job.slug}`}
                        className="group -mx-4 grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 rounded-2xl px-4 py-6 transition-colors duration-300 hover:bg-navy sm:-mx-6 sm:px-6 lg:grid-cols-[1fr_11rem_9rem_13rem_3.5rem] lg:py-7"
                      >
                        <div className="min-w-0">
                          <h3 className="text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-white sm:text-2xl">
                            {job.title}
                          </h3>
                          <p className="mt-1.5 text-sm text-muted transition-colors group-hover:text-white/70">
                            {t.postedOn.replace("{date}", formatLongDate(job.publishedAt, lang))}
                            {job.closesAt ? (
                              <>
                                {" · "}
                                <span className="font-semibold text-ink-soft group-hover:text-white/85">
                                  {t.closesOn.replace("{date}", formatLongDate(job.closesAt, lang))}
                                </span>
                              </>
                            ) : null}
                          </p>
                        </div>
                        <span
                          aria-label={t.viewRole}
                          className="col-start-2 row-start-1 flex h-12 w-12 items-center justify-center justify-self-end rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45 lg:col-start-5"
                        >
                          <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
                        </span>
                        <ul className="col-span-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft transition-colors group-hover:text-white/85 lg:contents">
                          <li className="flex items-center gap-1.5 lg:col-start-2 lg:row-start-1 lg:text-md lg:font-medium lg:text-ink lg:group-hover:text-white">
                            <Users className="h-4 w-4 lg:hidden" />
                            {job.department}
                          </li>
                          <li className="flex items-center gap-1.5 lg:col-start-3 lg:row-start-1 lg:text-md lg:font-medium lg:text-ink lg:group-hover:text-white">
                            <Clock className="h-4 w-4 lg:hidden" />
                            {t.employmentTypes[job.employmentType]}
                          </li>
                          <li className="flex items-center gap-1.5 lg:col-start-4 lg:row-start-1 lg:text-md lg:font-medium lg:text-ink lg:group-hover:text-white">
                            <MapPin className="h-4 w-4 shrink-0" />
                            {job.location}
                          </li>
                        </ul>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
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
                <Stamp>{t.openApplication.tag}</Stamp>
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
