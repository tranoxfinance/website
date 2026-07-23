import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

function SocialIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d={path} />
    </svg>
  );
}

const X_PATH =
  "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z";
const LINKEDIN_PATH =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";
const FACEBOOK_PATH =
  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z";
const INSTAGRAM_PATH =
  "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z";
const WHATSAPP_PATH =
  "M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z";

const SOCIALS = [
  { path: X_PATH, label: "X", href: "https://x.com/tranoxfinance" },
  {
    path: LINKEDIN_PATH,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tranox-finance-459265423/?skipRedirect=true",
  },
  {
    path: FACEBOOK_PATH,
    label: "Facebook",
    href: "https://web.facebook.com/profile.php?id=61591687215714",
  },
  {
    path: INSTAGRAM_PATH,
    label: "Instagram",
    href: "https://www.instagram.com/tranoxfinance/",
  },
];

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

export function Footer({ lang, dict }: FooterProps) {
  const year = new Date().getFullYear();
  const f = dict.footer;

  const columns = [
    {
      title: f.product,
      links: [
        { label: f.howItWorks, href: `/${lang}#how-it-works` },
        { label: f.whyTranox, href: `/${lang}#features` },
      ],
    },
    {
      title: f.company,
      links: [
        { label: f.about, href: `/${lang}/about` },
        { label: f.careers, href: `/${lang}/careers` },
        { label: f.news, href: `/${lang}/news` },
        { label: f.contact, href: `/${lang}#contacts` },
      ],
    },
    {
      title: f.legal,
      links: [
        { label: f.terms, href: `/${lang}/terms` },
        { label: f.privacy, href: `/${lang}/privacy` },
        { label: f.compliance, href: `/${lang}/compliance` },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.4fr_1fr] lg:gap-x-10 lg:gap-y-12">
          <div className="col-span-2 max-w-xs lg:col-span-1">
            <Logo href={`/${lang}`} ariaLabel={dict.nav.homeAria} />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {f.blurb}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-ink">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition hover:text-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div id="contacts" className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold text-ink">{f.contacts}</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:hello@tranoxfinance.com"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition hover:text-brand"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                  hello@tranoxfinance.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348000000000"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition hover:text-brand"
                >
                  <SocialIcon
                    path={WHATSAPP_PATH}
                    className="h-4 w-4 shrink-0 text-brand"
                  />
                  +234 800 000 0000
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348000000000"
                  className="flex items-center gap-2.5 text-sm text-ink-soft transition hover:text-brand"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.75} />
                  +234 800 000 0000
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-sm font-bold text-ink">{f.follow}</h3>
            <div className="mt-4 flex gap-2">
              {SOCIALS.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-ink-soft transition hover:border-brand/40 hover:text-brand"
                >
                  <SocialIcon path={social.path} className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>{f.rights.replace("{year}", String(year))}</p>
          <p className="max-w-xl text-xs leading-relaxed">{f.disclaimer}</p>
        </div>
      </Container>
    </footer>
  );
}
