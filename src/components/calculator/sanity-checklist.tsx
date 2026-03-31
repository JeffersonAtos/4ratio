"use client";

import type { Dictionary } from "@/lib/i18n";

type Props = {
  checks: boolean[];
  onToggle: (index: number) => void;
  dict: Dictionary;
};

export function SanityChecklist({ checks, onToggle, dict }: Props) {
  const items = [
    dict.calculator.sanity1,
    dict.calculator.sanity2,
    dict.calculator.sanity3,
    dict.calculator.sanity4,
    dict.calculator.sanity5,
    dict.calculator.sanity6,
    dict.calculator.sanity7,
    dict.calculator.sanity8,
  ];

  const uncheckedCount = checks.filter((c) => !c).length;

  return (
    <div>
      <p className="mb-3 text-xs text-t2">{dict.calculator.sanityIntro}</p>
      <div className="space-y-2.5">
        {items.map((item, i) => (
          <label
            key={i}
            className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              checks[i]
                ? "border-green/20 bg-green/5"
                : "border-border-2 bg-surface-3 hover:border-amber/30"
            }`}
          >
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => onToggle(i)}
              className="mt-0.5 h-4 w-4 rounded border-border-2 bg-surface-3 accent-green"
            />
            <span className={`text-xs leading-relaxed ${checks[i] ? "text-t" : "text-t2"}`}>
              {item}
            </span>
          </label>
        ))}
      </div>
      {uncheckedCount > 0 && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-amber/20 bg-amber/5 p-3">
          <svg
            className="h-4 w-4 flex-shrink-0 text-amber mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p className="text-xs text-amber">{dict.calculator.sanityWarning}</p>
        </div>
      )}
    </div>
  );
}
