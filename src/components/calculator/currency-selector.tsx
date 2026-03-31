"use client";

import { CURRENCIES } from "@/lib/tax-guides";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  value: string;
  onChange: (code: string) => void;
  dict: Dictionary;
};

export function CurrencySelector({ value, onChange, dict }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-t2 mb-1.5">
        {dict.calculator.currency}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border-2 bg-surface-3 px-3 py-2 text-sm text-t outline-none transition-colors focus:border-green"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.symbol} {c.code} — {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
