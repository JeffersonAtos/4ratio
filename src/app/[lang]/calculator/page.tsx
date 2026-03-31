import type { Metadata } from "next";
import { getDictionary, isValidLang, LANGUAGES, type Lang } from "@/lib/i18n";
import { CalculatorForm } from "@/components/calculator/calculator-form";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.calculatorTitle,
    description: dict.meta.calculatorDescription,
    openGraph: {
      title: dict.meta.calculatorTitle,
      description: dict.meta.calculatorDescription,
      type: "website",
      locale: lang,
    },
  };
}

export default async function CalculatorPage({ params }: Props) {
  const { lang } = await params;
  const validLang: Lang = isValidLang(lang) ? lang : "en";
  const dict = getDictionary(validLang);

  return <CalculatorForm dict={dict} lang={validLang} />;
}
