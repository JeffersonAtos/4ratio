"use client";

import { useState } from "react";

type Props = {
  title: string;
  number: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function SectionAccordion({
  title,
  number,
  defaultOpen = true,
  children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border-1 bg-surface-2 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-3"
      >
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-green/10 font-mono text-xs font-bold text-green">
          {number}
        </span>
        <span className="flex-1 text-sm font-semibold text-t">{title}</span>
        <svg
          className={`h-4 w-4 text-t3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="border-t border-border-1 px-5 py-4">{children}</div>}
    </div>
  );
}
