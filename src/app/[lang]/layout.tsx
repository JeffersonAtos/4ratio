import type { Metadata } from "next";
import { getDictionary, LANGUAGES, isValidLang } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      locale: lang,
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const validLang = isValidLang(lang) ? lang : "en";
  const dict = getDictionary(validLang);

  return (
    <>
      <Header lang={validLang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer dict={dict} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "4ratio",
            description: dict.meta.description,
            url: `https://4ratio.com/${validLang}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
