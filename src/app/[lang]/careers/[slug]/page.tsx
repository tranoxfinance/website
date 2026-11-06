import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDown, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { hasLocale, localeAlternates } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getJobBySlug } from "@/lib/careers";
import { formatLongDate } from "@/lib/dates";
import { plainTextToHtml } from "@/lib/richText";
import { cn } from "@/lib/utils";
import { ApplyForm } from "./ApplyForm";

const richTextClass = cn(
  "text-lg leading-relaxed text-ink-soft",
  "[&_ul]:my-5 [&_ul]:space-y-3 [&_ul]:pl-0",
  "[&_li]:relative [&_li]:pl-7 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:h-2.5 [&_li]:before:w-2.5 [&_li]:before:rounded-full [&_li]:before:bg-green",
  "[&_h1]:mb-3 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-ink [&_h1]:first:mt-0",
  "[&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-ink [&_h2]:first:mt-0",
  "[&_p]:mb-5 [&_p]:last:mb-0",
  "[&_strong]:font-semibold [&_strong]:text-ink",
);

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const job = await getJobBySlug(slug);
  return {
    title: job
      ? `${job.title} — ${dict.careersPage.metaTitle}`
      : dict.careersPage.metaTitle,
    description: dict.careersPage.metaDescription,
    alternates: localeAlternates(lang, `/careers/${slug}`),
  };
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.careersPage;
  const job = await getJobBySlug(slug);
  if (!job) {
    notFound();
  }

  const details = [
    { icon: Users, label: t.department, value: job.department },
    { icon: Clock, label: t.type, value: t.employmentTypes[job.employmentType] },
    { icon: MapPin, label: t.location, value: job.location },
    {
      icon: CalendarDays,
      label: t.posted,
      value: formatLongDate(job.publishedAt, lang),
    },
  ];

  return (
    <>
      <Navbar lang={lang} dict={dict.nav} overlay />
      <main className="flex-1">
        <PageHero
          tag={job.department}
          title={job.title}
          photo={t.photo}
          back={{ href: `/${lang}/careers`, label: t.backToCareers }}
        >
          <ul className="mt-8 flex flex-wrap gap-2">
            {[t.employmentTypes[job.employmentType], job.location].map((meta) => (
              <li
                key={meta}
                className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white"
              >
                {meta}
              </li>
            ))}
            {job.closesAt ? (
              <li className="rounded-full bg-gold px-4 py-1.5 text-sm font-bold text-navy">
                {t.closesOn.replace("{date}", formatLongDate(job.closesAt, lang))}
              </li>
            ) : null}
          </ul>
          <a
            href="#apply"
            className="group mt-8 inline-flex h-14 items-center gap-4 rounded-full bg-green pl-6 pr-2 text-lg font-bold text-navy transition hover:brightness-105"
          >
            {t.applyNow}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowDown className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </a>
        </PageHero>

        <section className="py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div className="min-w-0 max-w-3xl">
              <h2 className="font-display text-4xl uppercase leading-none text-ink sm:text-5xl">
                {t.aboutRole}
              </h2>
              <div
                className={cn("mt-6", richTextClass)}
                dangerouslySetInnerHTML={{ __html: plainTextToHtml(job.description) }}
              />

              <h2 className="mt-14 font-display text-4xl uppercase leading-none text-ink sm:text-5xl">
                {t.requirements}
              </h2>
              <div
                className={cn("mt-6", richTextClass)}
                dangerouslySetInnerHTML={{ __html: plainTextToHtml(job.requirements) }}
              />
            </div>

            <aside className="order-first lg:order-none">
              <div className="overflow-hidden rounded-3xl bg-surface lg:sticky lg:top-24">
                <h2 className="bg-navy px-6 py-4 text-xs font-bold uppercase tracking-[0.1em] text-white">
                  {t.roleDetails}
                </h2>
                <dl className="divide-y divide-border px-6">
                  {details.map((row) => (
                    <div key={row.label} className="flex items-start gap-3 py-4">
                      <row.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={2} />
                      <div>
                        <dt className="text-xs text-muted">{row.label}</dt>
                        <dd className="mt-0.5 font-semibold text-ink">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
                <div className="p-6 pt-2">
                  <a
                    href="#apply"
                    className="flex h-12 w-full items-center justify-center rounded-full bg-navy text-md font-bold text-white transition hover:brightness-125"
                  >
                    {t.applyNow}
                  </a>
                </div>
              </div>
            </aside>
          </Container>
        </section>

        <section id="apply" className="scroll-mt-20 bg-surface py-16 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal>
              <span className="inline-block -rotate-3 bg-green px-4 py-2 font-display text-xl uppercase leading-none text-navy sm:text-2xl">
                {job.title}
              </span>
              <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] text-ink sm:text-7xl">
                {t.applyHeading}
              </h2>
              <ol className="mt-10 space-y-5">
                {t.applySteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy font-display text-2xl text-white">
                      {index + 1}
                    </span>
                    <span className="text-lg font-semibold text-ink">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-sm leading-relaxed text-ink-soft">{t.applySub}</p>
            </Reveal>

            <div className="min-w-0 rounded-3xl bg-card p-6 shadow-lift sm:p-10">
              <ApplyForm jobId={job.id} dict={t} />
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
