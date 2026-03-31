import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export function HowItWorks({ dict }: Props) {
  const steps = [
    { num: "01", title: dict.howItWorks.step1Title, text: dict.howItWorks.step1Text },
    { num: "02", title: dict.howItWorks.step2Title, text: dict.howItWorks.step2Text },
    { num: "03", title: dict.howItWorks.step3Title, text: dict.howItWorks.step3Text },
  ];

  return (
    <section className="border-y border-border-1 bg-surface-1 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-t sm:text-4xl">
            {dict.howItWorks.title}
          </h2>
          <p className="mt-3 text-t2">{dict.howItWorks.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-green/30 bg-green/10">
                <span className="font-mono text-sm font-bold text-green">
                  {step.num}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-t">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-t3">
                {step.text}
              </p>
              {i < 2 && (
                <div className="absolute right-0 top-6 hidden -translate-y-1/2 translate-x-1/2 text-t3 sm:block">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
