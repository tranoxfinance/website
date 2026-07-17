import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export type LegalBlock = string | { list: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

interface LegalContent {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

interface LegalPageProps {
  lang: Locale;
  dict: Dictionary;
  page: LegalContent;
}

function slugify(heading: string) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function LegalPage({ lang, dict, page }: LegalPageProps) {
  return (
    <>
      <Navbar lang={lang} dict={dict.nav} />
      <main className="flex-1">
        <section className="border-b border-border bg-surface py-16 sm:py-20">
          <Container className="max-w-3xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {dict.legalPage.tag}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {page.title}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {dict.legalPage.lastUpdated.replace("{date}", page.lastUpdated)}
            </p>
          </Container>
        </section>

        <section className="py-14 sm:py-16">
          <Container className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-soft">{page.intro}</p>

            <div className="mt-12 space-y-10">
              {page.sections.map((section) => (
                <div key={section.heading} id={slugify(section.heading)}>
                  <h2 className="text-xl font-bold tracking-tight text-ink">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.blocks.map((block, index) =>
                      typeof block === "string" ? (
                        <p
                          key={index}
                          className="text-[15px] leading-relaxed text-ink-soft"
                        >
                          {block}
                        </p>
                      ) : (
                        <ul
                          key={index}
                          className="space-y-2 pl-1 text-[15px] leading-relaxed text-ink-soft"
                        >
                          {block.list.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer lang={lang} dict={dict} />
    </>
  );
}
