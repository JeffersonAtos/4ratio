"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  calculatePricing,
  DEFAULT_INPUTS,
  type CalculatorInputs,
} from "@/lib/calculator";
import { TAX_GUIDES, CURRENCIES } from "@/lib/tax-guides";
import type { Dictionary, Lang } from "@/lib/i18n";
import { SectionAccordion } from "./section-accordion";
import { TaxTooltip } from "./tax-tooltip";
import { CurrencySelector } from "./currency-selector";
import { SanityChecklist } from "./sanity-checklist";
import { ResultPanel } from "./result-panel";

const LANG_DEFAULTS: Record<Lang, { country: string; currency: string }> = {
  pt: { country: "BR", currency: "BRL" },
  es: { country: "MX", currency: "MXN" },
  en: { country: "US", currency: "USD" },
};

const COUNTRY_TO_LANG: Record<string, Lang> = {
  BR: "pt",
  PT: "pt",
  MX: "es",
  CO: "es",
  AR: "es",
  ES: "es",
  US: "en",
  GB: "en",
  AU: "en",
  CA: "en",
  IN: "en",
  DE: "en",
  FR: "en",
  IL: "en",
  JP: "en",
  KR: "en",
  NG: "en",
  ZA: "en",
  ID: "en",
  AE: "en",
};

type Props = {
  dict: Dictionary;
  lang: Lang;
};

export function CalculatorForm({ dict, lang }: Props) {
  const router = useRouter();
  const defaults = LANG_DEFAULTS[lang] || LANG_DEFAULTS.en;
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [country, setCountry] = useState(defaults.country);
  const [currency, setCurrency] = useState(defaults.currency);
  const [serviceName, setServiceName] = useState("");
  const [serviceType, setServiceType] = useState("service");
  const [sanityChecks, setSanityChecks] = useState<boolean[]>(
    Array(8).fill(false)
  );

  const result = useMemo(() => calculatePricing(inputs), [inputs]);

  const currencySymbol =
    CURRENCIES.find((c) => c.code === currency)?.symbol || "$";

  function updateField(field: keyof CalculatorInputs, value: number | boolean) {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }

  function numChange(field: keyof CalculatorInputs) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value) || 0;
      updateField(field, val);
    };
  }

  function handleCountryChange(code: string) {
    setCountry(code);
    const guide = TAX_GUIDES.find((g) => g.code === code);
    if (guide) {
      const matchedCurrency = CURRENCIES.find(
        (c) => c.code === guide.currency
      );
      if (matchedCurrency) setCurrency(matchedCurrency.code);
    }
    // Redirect to the country's language
    const targetLang = COUNTRY_TO_LANG[code] || "en";
    if (targetLang !== lang) {
      router.push(`/${targetLang}/calculator`);
    }
  }

  function toggleSanity(index: number) {
    setSanityChecks((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-t sm:text-3xl">
          {dict.calculator.title}
        </h1>
        <p className="mt-2 text-sm text-t2">{dict.calculator.subtitle}</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Form Column */}
        <div className="flex-1 space-y-4 lg:max-w-[60%] pb-28 lg:pb-0">
          {/* Section 1: Identification */}
          <SectionAccordion
            title={dict.calculator.section1}
            number={1}
            defaultOpen={true}
          >
            <div className="space-y-4">
              <InputField
                label={dict.calculator.serviceName}
                placeholder={dict.calculator.serviceNamePlaceholder}
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                type="text"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-t2 mb-1.5">
                    {dict.calculator.serviceType}
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full rounded-lg border border-border-2 bg-surface-3 px-3 py-2 text-sm text-t outline-none transition-colors focus:border-green"
                  >
                    <option value="service">
                      {dict.calculator.serviceTypeService}
                    </option>
                    <option value="product">
                      {dict.calculator.serviceTypeProduct}
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-t2 mb-1.5">
                    {dict.calculator.country}
                  </label>
                  <select
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full rounded-lg border border-border-2 bg-surface-3 px-3 py-2 text-sm text-t outline-none transition-colors focus:border-green"
                  >
                    <option value="">{dict.calculator.selectCountry}</option>
                    {TAX_GUIDES.map((g) => (
                      <option key={g.code} value={g.code}>
                        {g.flag} {g.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <CurrencySelector
                value={currency}
                onChange={setCurrency}
                dict={dict}
              />
            </div>
          </SectionAccordion>

          {/* Section 2: Direct Costs */}
          <SectionAccordion
            title={dict.calculator.section2}
            number={2}
            defaultOpen={true}
          >
            <div className="space-y-4">
              <NumericField
                label={dict.calculator.materials}
                help={dict.calculator.materialsHelp}
                value={inputs.materials}
                onChange={numChange("materials")}
                prefix={currencySymbol}
              />
              <NumericField
                label={dict.calculator.labor}
                help={dict.calculator.laborHelp}
                value={inputs.labor}
                onChange={numChange("labor")}
                prefix={currencySymbol}
              />
              <Warning text={dict.calculator.laborWarning} />
              <NumericField
                label={dict.calculator.otherDirect}
                help={dict.calculator.otherDirectHelp}
                value={inputs.otherDirect}
                onChange={numChange("otherDirect")}
                prefix={currencySymbol}
              />
            </div>
          </SectionAccordion>

          {/* Section 3: Fixed Costs Allocation */}
          <SectionAccordion title={dict.calculator.section3} number={3}>
            <div className="space-y-4">
              <p className="text-xs text-t3 mb-2">
                {dict.calculator.fixedCostsInfo}
              </p>
              <NumericField
                label={dict.calculator.rent}
                value={inputs.rent}
                onChange={numChange("rent")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.admin}
                value={inputs.admin}
                onChange={numChange("admin")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.tech}
                value={inputs.tech}
                onChange={numChange("tech")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.ownerSalary}
                value={inputs.ownerSalary}
                onChange={numChange("ownerSalary")}
                suffix="%"
              />
              <Warning text={dict.calculator.ownerSalaryWarning} />
            </div>
          </SectionAccordion>

          {/* Section 4: Tax on Revenue */}
          <SectionAccordion title={dict.calculator.section4} number={4}>
            <div className="space-y-4">
              <div>
                <div className="flex items-center">
                  <label className="block text-xs font-medium text-t2">
                    {dict.calculator.taxRate}
                  </label>
                  <TaxTooltip countryCode={country} dict={dict} />
                </div>
                <p className="text-[11px] text-t3 mb-1.5 mt-0.5">
                  {dict.calculator.taxRateHelp}
                </p>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={inputs.taxRate || ""}
                    onChange={numChange("taxRate")}
                    className="w-full rounded-lg border border-border-2 bg-surface-3 px-3 py-2 pr-8 text-sm text-t outline-none transition-colors focus:border-green"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-t3">
                    %
                  </span>
                </div>
              </div>

              {/* VAT toggle */}
              <div className="rounded-lg border border-border-1 bg-surface-3 p-3">
                <p className="text-xs font-medium text-t2 mb-2">
                  {dict.calculator.vatToggle}
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="vat"
                      checked={inputs.vatSeparate}
                      onChange={() => updateField("vatSeparate", true)}
                      className="accent-green"
                    />
                    <span className="text-xs text-t2">
                      {dict.calculator.vatYes}
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="vat"
                      checked={!inputs.vatSeparate}
                      onChange={() => updateField("vatSeparate", false)}
                      className="accent-green"
                    />
                    <span className="text-xs text-t2">
                      {dict.calculator.vatNo}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </SectionAccordion>

          {/* Section 5: Channel Fees */}
          <SectionAccordion title={dict.calculator.section5} number={5}>
            <div className="space-y-4">
              <NumericField
                label={dict.calculator.paymentProcessing}
                help={dict.calculator.paymentProcessingHelp}
                value={inputs.paymentProcessing}
                onChange={numChange("paymentProcessing")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.marketplace}
                help={dict.calculator.marketplaceHelp}
                value={inputs.marketplace}
                onChange={numChange("marketplace")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.salesCommission}
                help={dict.calculator.salesCommissionHelp}
                value={inputs.salesCommission}
                onChange={numChange("salesCommission")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.badDebt}
                help={dict.calculator.badDebtHelp}
                value={inputs.badDebt}
                onChange={numChange("badDebt")}
                suffix="%"
              />
            </div>
          </SectionAccordion>

          {/* Section 6: Margin & Market */}
          <SectionAccordion title={dict.calculator.section6} number={6}>
            <div className="space-y-4">
              <NumericField
                label={dict.calculator.desiredMargin}
                help={dict.calculator.desiredMarginHelp}
                value={inputs.desiredMargin}
                onChange={numChange("desiredMargin")}
                suffix="%"
              />
              <NumericField
                label={dict.calculator.competitorPrice}
                help={dict.calculator.competitorPriceHelp}
                value={inputs.competitorPrice}
                onChange={numChange("competitorPrice")}
                prefix={currencySymbol}
              />
            </div>
          </SectionAccordion>

          {/* Section 7: Sanity Checklist */}
          <SectionAccordion title={dict.calculator.section7} number={7}>
            <SanityChecklist
              checks={sanityChecks}
              onToggle={toggleSanity}
              dict={dict}
            />
          </SectionAccordion>
        </div>

        {/* Result Panel Column */}
        <div className="lg:w-[40%]">
          <ResultPanel
            result={result}
            currencySymbol={currencySymbol}
            dict={dict}
          />
        </div>
      </div>
    </div>
  );
}

/* ---- Helper components ---- */

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-t2 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-2 bg-surface-3 px-3 py-2 text-sm text-t outline-none transition-colors focus:border-green placeholder:text-t3"
      />
    </div>
  );
}

function NumericField({
  label,
  help,
  value,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  help?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-t2">{label}</label>
      {help && (
        <p className="text-[11px] text-t3 mb-1.5 mt-0.5">{help}</p>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-t3">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          step={suffix ? 0.1 : 1}
          value={value || ""}
          onChange={onChange}
          className={`w-full rounded-lg border border-border-2 bg-surface-3 py-2 text-sm text-t outline-none transition-colors focus:border-green ${
            prefix ? "pl-9 pr-3" : suffix ? "pl-3 pr-8" : "px-3"
          }`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-t3">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-amber/20 bg-amber/5 p-3">
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
      <p className="text-xs text-amber">{text}</p>
    </div>
  );
}
