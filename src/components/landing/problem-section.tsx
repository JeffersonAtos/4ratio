import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export function ProblemSection({ dict }: Props) {
  const cards = [
    {
      title: dict.problem.card1Title,
      text: dict.problem.card1Text,
      icon: (
        <svg className="h-8 w-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
        </svg>
      ),
      border: "hover:border-amber/30",
    },
    {
      title: dict.problem.card2Title,
      text: dict.problem.card2Text,
      icon: (
        <svg className="h-8 w-8 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        </svg>
      ),
      border: "hover:border-red/30",
    },
    {
      title: dict.problem.card3Title,
      text: dict.problem.card3Text,
      icon: (
        <svg className="h-8 w-8 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898M18.75 19.5l3-3m0 0l-3-3m3 3H15" />
        </svg>
      ),
      border: "hover:border-red/30",
    },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-t sm:text-4xl">
            {dict.problem.title}
          </h2>
          <p className="mt-3 text-lg text-t2">{dict.problem.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-xl border border-border-2 bg-surface-2 p-6 transition-colors ${card.border}`}
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-t">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-t3">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
