import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export function ValueStack({ dict }: Props) {
  const items = [
    { title: dict.valueStack.v1Title, text: dict.valueStack.v1Text, value: dict.valueStack.v1Value },
    { title: dict.valueStack.v2Title, text: dict.valueStack.v2Text, value: dict.valueStack.v2Value },
    { title: dict.valueStack.v3Title, text: dict.valueStack.v3Text, value: dict.valueStack.v3Value },
    { title: dict.valueStack.v4Title, text: dict.valueStack.v4Text, value: dict.valueStack.v4Value },
    { title: dict.valueStack.v5Title, text: dict.valueStack.v5Text, value: dict.valueStack.v5Value },
  ];

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-t sm:text-4xl">
            {dict.valueStack.title}
          </h2>
          <p className="mt-3 text-lg text-t2">{dict.valueStack.subtitle}</p>
        </div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-border-1 bg-surface-2 p-5 transition-colors hover:border-green/20"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-t">{item.title}</h3>
                <p className="mt-1 text-sm text-t3 leading-relaxed">{item.text}</p>
              </div>
              <div className="hidden sm:block flex-shrink-0">
                <span className="text-xs font-medium text-t3 line-through decoration-t3/50">{item.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 rounded-xl border-2 border-green/30 bg-green/5 p-6 text-center">
          <p className="text-2xl font-bold text-green">{dict.valueStack.totalValue}</p>
        </div>
      </div>
    </section>
  );
}
