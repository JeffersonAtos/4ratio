import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";

type Props = { lang: Lang; dict: Dictionary };

export function StatsSection({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: dict.stats.stat1Value, label: dict.stats.stat1Label, source: dict.stats.stat1Source },
    { value: dict.stats.stat2Value, label: dict.stats.stat2Label, source: dict.stats.stat2Source },
    { value: dict.stats.stat3Value, label: dict.stats.stat3Label, source: dict.stats.stat3Source },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-t sm:text-4xl">
          {dict.stats.title}
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-mono text-5xl font-bold text-green">
                {s.value}
              </p>
              <p className="mt-2 text-base font-medium text-t">{s.label}</p>
              <p className="mt-1 text-xs text-t3">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection({ lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08)_0%,transparent_70%)]" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold text-t sm:text-4xl">
          {dict.cta.title}
        </h2>
        <p className="mt-4 text-lg text-t2">{dict.cta.subtitle}</p>
        <div className="mt-8">
          <Link
            href={`/${lang}/calculator`}
            className="inline-flex items-center gap-2 rounded-xl bg-green px-8 py-4 text-base font-bold text-black transition-all hover:bg-green/90 hover:scale-[1.02] shadow-lg shadow-green/20"
          >
            {dict.cta.button}
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
        <p className="mt-4 text-xs text-t3">{dict.cta.footnote}</p>
      </div>
    </section>
  );
}
