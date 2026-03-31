"use client";

import { useState } from "react";
import type { PricingResult } from "@/lib/calculator";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  result: PricingResult;
  currencySymbol: string;
  dict: Dictionary;
};

function fmt(n: number, symbol: string): string {
  return `${symbol} ${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function ResultPanel({ result, currencySymbol, dict }: Props) {
  const [showScenarios, setShowScenarios] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const sym = currencySymbol;

  const hasData = result.directCosts > 0;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block h-full">
        <div className="sticky top-20">
          <ResultContent
            result={result}
            sym={sym}
            dict={dict}
            hasData={hasData}
            showScenarios={showScenarios}
            setShowScenarios={setShowScenarios}
          />
        </div>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border-2 bg-surface-2/95 backdrop-blur-xl">
        {mobileExpanded ? (
          <div className="max-h-[70vh] overflow-y-auto p-4">
            <button
              onClick={() => setMobileExpanded(false)}
              className="mb-3 text-xs text-t3 hover:text-t"
            >
              {dict.calculator.collapseResults}
            </button>
            <ResultContent
              result={result}
              sym={sym}
              dict={dict}
              hasData={hasData}
              showScenarios={showScenarios}
              setShowScenarios={setShowScenarios}
            />
          </div>
        ) : (
          <button
            onClick={() => setMobileExpanded(true)}
            className="flex w-full items-center justify-between p-4"
          >
            <div>
              <p className="text-xs text-t3">{dict.calculator.suggestedPrice}</p>
              <p className="text-xl font-bold text-green">
                {hasData ? fmt(result.suggestedPrice, sym) : `${sym} 0.00`}
              </p>
            </div>
            <span className="rounded-lg border border-border-2 px-3 py-1.5 text-xs font-medium text-t2">
              {dict.calculator.expandResults}
            </span>
          </button>
        )}
      </div>
    </>
  );
}

function ResultContent({
  result,
  sym,
  dict,
  hasData,
  showScenarios,
  setShowScenarios,
}: {
  result: PricingResult;
  sym: string;
  dict: Dictionary;
  hasData: boolean;
  showScenarios: boolean;
  setShowScenarios: (v: boolean) => void;
}) {
  return (
    <div className="rounded-xl border border-border-1 bg-surface-2 p-5">
      <h3 className="text-sm font-bold text-t mb-4">{dict.calculator.results}</h3>

      {result.deductionWarning && hasData && (
        <div className="mb-4 rounded-lg border border-red/30 bg-red/5 p-3">
          <p className="text-xs text-red font-medium">{dict.calculator.deductionWarning}</p>
        </div>
      )}

      {/* Cost breakdown */}
      <div className="space-y-2.5">
        <Row label={dict.calculator.directCostsLabel} value={fmt(result.directCosts, sym)} />
        <Row label={dict.calculator.fixedCostsLabel} value={fmt(result.fixedCostsAmount, sym)} />
        <Row label={dict.calculator.taxLabel} value={fmt(result.taxAmount, sym)} />
        <Row label={dict.calculator.channelFeesLabel} value={fmt(result.channelFeesAmount, sym)} />
      </div>

      <div className="my-4 border-t border-border-1" />

      {/* Total real cost */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-t">{dict.calculator.totalRealCost}</span>
        <span className="font-mono text-sm font-bold text-t">
          {fmt(result.totalRealCost, sym)}
        </span>
      </div>

      <div className="my-4 border-t border-border-1" />

      {/* Break-even */}
      <div className="rounded-lg border border-amber/20 bg-amber/5 p-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber">
            {dict.calculator.breakevenPrice}
          </span>
          <span className="font-mono text-sm font-bold text-amber">
            {fmt(result.breakevenPrice, sym)}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-amber/70">{dict.calculator.breakevenDesc}</p>
      </div>

      {/* Suggested price */}
      <div className="rounded-lg border border-green/20 bg-green/5 p-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-green">
            {dict.calculator.suggestedPrice}
          </span>
          <span className="font-mono text-lg font-bold text-green">
            {fmt(result.suggestedPrice, sym)}
          </span>
        </div>
        <p className="mt-1 text-[10px] text-green/70">{dict.calculator.suggestedDesc}</p>
      </div>

      {/* Effective margin */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-t3">{dict.calculator.effectiveMargin}</span>
        <span className="font-mono text-xs font-medium text-green">
          {result.effectiveMargin.toFixed(1)}%
        </span>
      </div>

      {/* vs Competitor */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-t3">{dict.calculator.vsCompetitor}</span>
        <span className="font-mono text-xs font-medium text-t2">
          {result.vsCompetitor !== null && result.suggestedPrice > 0
            ? `${result.vsCompetitor > 0 ? "+" : ""}${result.vsCompetitor.toFixed(1)}% ${result.vsCompetitor > 0 ? dict.calculator.moreExpensive : dict.calculator.cheaper}`
            : dict.calculator.noCompetitor}
        </span>
      </div>

      {/* Scenarios */}
      <button
        onClick={() => setShowScenarios(!showScenarios)}
        className="w-full rounded-lg border border-border-2 px-3 py-2 text-xs font-medium text-t2 transition-colors hover:border-border-2 hover:bg-surface-3"
      >
        {dict.calculator.scenarios}
      </button>

      {showScenarios && hasData && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { key: "conservative" as const, label: dict.calculator.conservative },
            { key: "current" as const, label: dict.calculator.current },
            { key: "aggressive" as const, label: dict.calculator.aggressive },
          ].map((s) => (
            <div
              key={s.key}
              className={`rounded-lg border p-2.5 text-center ${
                s.key === "current"
                  ? "border-green/30 bg-green/5"
                  : "border-border-1 bg-surface-3"
              }`}
            >
              <p className="text-[10px] text-t3">{s.label}</p>
              <p className="font-mono text-xs font-bold text-t mt-1">
                {fmt(result.scenarios[s.key].price, sym)}
              </p>
              <p className="text-[10px] text-t3">
                {result.scenarios[s.key].margin.toFixed(0)}% {dict.calculator.margin}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Feedback */}
      <a
        href={`mailto:feedback@4ratio.com?subject=${encodeURIComponent(dict.calculator.feedbackSubject)}`}
        className="mt-4 block text-center text-[11px] text-t3 hover:text-t2 transition-colors"
      >
        {dict.calculator.feedbackLink}
      </a>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-t3">{label}</span>
      <span className="font-mono text-xs text-t2">{value}</span>
    </div>
  );
}
