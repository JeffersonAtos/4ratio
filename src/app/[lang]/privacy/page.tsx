import { getDictionary, LANGUAGES, isValidLang } from "@/lib/i18n";
import type { Metadata } from "next";

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
    title: `${dict.privacy.title} - 4ratio`,
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { lang } = await params;
  const validLang = isValidLang(lang) ? lang : "en";
  const dict = getDictionary(validLang);

  const sections = [
    { title: dict.privacy.section1Title, text: dict.privacy.section1Text },
    { title: dict.privacy.section2Title, text: dict.privacy.section2Text },
    { title: dict.privacy.section3Title, text: dict.privacy.section3Text },
    { title: dict.privacy.section4Title, text: dict.privacy.section4Text },
    { title: dict.privacy.section5Title, text: dict.privacy.section5Text },
    { title: dict.privacy.section6Title, text: dict.privacy.section6Text },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-t">{dict.privacy.title}</h1>
      <p className="mt-2 text-sm text-t3">{dict.privacy.lastUpdated}</p>
      <p className="mt-6 text-base text-t2 leading-relaxed">{dict.privacy.intro}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-semibold text-t">{section.title}</h2>
            <p className="mt-2 text-sm text-t3 leading-relaxed">{section.text}</p>
            {i === sections.length - 1 && (
              <a
                href={`mailto:${dict.privacy.contactEmail}`}
                className="mt-2 inline-block text-sm text-green hover:underline"
              >
                {dict.privacy.contactEmail}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
