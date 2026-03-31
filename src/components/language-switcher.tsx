"use client";

import { usePathname, useRouter } from "next/navigation";
import { LANGUAGES, LANGUAGE_LABELS, type Lang } from "@/lib/i18n";

export function LanguageSwitcher({ current }: { current: Lang }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLang(lang: Lang) {
    // Replace the current lang segment in the path
    const segments = pathname.split("/");
    segments[1] = lang;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border-2 bg-surface-2 p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => switchLang(lang)}
          className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
            current === lang
              ? "bg-surface-3 text-t border border-border-2"
              : "text-t3 hover:text-t2"
          }`}
        >
          {LANGUAGE_LABELS[lang]}
        </button>
      ))}
    </div>
  );
}
