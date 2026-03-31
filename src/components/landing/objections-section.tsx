import type { Dictionary } from "@/lib/i18n";

type Props = { dict: Dictionary };

export function ObjectionsSection({ dict }: Props) {
  const items = [
    { q: dict.objections.o1Q, a: dict.objections.o1A },
    { q: dict.objections.o2Q, a: dict.objections.o2A },
    { q: dict.objections.o3Q, a: dict.objections.o3A },
    { q: dict.objections.o4Q, a: dict.objections.o4A },
    { q: dict.objections.o5Q, a: dict.objections.o5A },
  ];

  return (
    <section className="border-y border-border-1 bg-surface-1 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-bold text-t sm:text-4xl mb-14">
          {dict.objections.title}
        </h2>

        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl border border-border-2 bg-surface-2 p-5">
              <p className="font-semibold text-t italic">{item.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-t2">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
