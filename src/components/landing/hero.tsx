import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";

type Props = { lang: Lang; dict: Dictionary };

export function Hero({ lang, dict }: Props) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      {/* Gradient bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.06)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Trust badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green/20 bg-green/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-green animate-pulse" />
          <span className="text-xs font-medium text-green">{dict.hero.badge}</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-t sm:text-5xl lg:text-6xl">
          {dict.hero.headline}
          <br />
          <span className="text-green">{dict.hero.headlineBold}</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-t2 sm:text-xl">
          {dict.hero.subheadline}
        </p>

        <div className="mt-10">
          <Link
            href={`/${lang}/calculator`}
            className="inline-flex items-center gap-2 rounded-xl bg-green px-8 py-4 text-base font-bold text-black transition-all hover:bg-green/90 hover:scale-[1.02] shadow-lg shadow-green/20"
          >
            {dict.hero.cta}
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

        {/* Value props */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[dict.hero.valueProp1, dict.hero.valueProp2, dict.hero.valueProp3].map((prop, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-sm text-t2">{prop}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
