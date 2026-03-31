import { getDictionary, isValidLang, type Lang } from "@/lib/i18n";
import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { ValueStack } from "@/components/landing/value-stack";
import { ObjectionsSection } from "@/components/landing/objections-section";
import { StatsSection, CtaSection } from "@/components/landing/cta-section";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { lang } = await params;
  const validLang: Lang = isValidLang(lang) ? lang : "en";
  const dict = getDictionary(validLang);

  return (
    <>
      <Hero lang={validLang} dict={dict} />
      <ProblemSection dict={dict} />
      <HowItWorks dict={dict} />
      <ValueStack dict={dict} />
      <StatsSection dict={dict} />
      <ObjectionsSection dict={dict} />
      <CtaSection lang={validLang} dict={dict} />
    </>
  );
}
