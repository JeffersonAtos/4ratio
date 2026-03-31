"use client";

import { useState, useRef, useEffect } from "react";
import { getTaxGuideByCode } from "@/lib/tax-guides";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  countryCode: string;
  dict: Dictionary;
};

export function TaxTooltip({ countryCode, dict }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const guide = getTaxGuideByCode(countryCode);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!guide) return null;

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-border-2 text-[10px] text-t3 transition-colors hover:border-green hover:text-green"
      >
        i
      </button>
      {open && (
        <div className="absolute left-0 top-7 z-50 w-64 rounded-lg border border-border-2 bg-surface-3 p-3 shadow-xl">
          <p className="mb-2 text-xs font-medium text-t2">
            {dict.calculator.taxTooltip} {guide.flag} {guide.country}
          </p>
          <div className="space-y-1.5">
            {guide.ranges.map((r, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-xs"
              >
                <span className="text-t3">{r.regime}</span>
                <span className="font-mono text-green">{r.range}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
