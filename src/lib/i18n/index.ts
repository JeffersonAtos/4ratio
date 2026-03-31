import en, { type Dictionary } from "./en";
import pt from "./pt";
import es from "./es";

export type { Dictionary };
export type Lang = "en" | "pt" | "es";

export const LANGUAGES: Lang[] = ["en", "pt", "es"];

export const LANGUAGE_LABELS: Record<Lang, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

const dictionaries: Record<Lang, Dictionary> = { en, pt, es };

export function getDictionary(lang: string): Dictionary {
  if (lang in dictionaries) return dictionaries[lang as Lang];
  return en;
}

export function isValidLang(lang: string): lang is Lang {
  return LANGUAGES.includes(lang as Lang);
}
