import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

type Props = {
  lang: Lang;
  dict: Dictionary;
};

export function Header({ lang, dict }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b border-border-1 bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href={`/${lang}`}
          className="text-lg font-semibold tracking-tight text-t"
        >
          {dict.nav.logo}
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher current={lang} />
          <Link
            href={`/${lang}/calculator`}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-t px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-t2"
          >
            {dict.nav.tryFree}
          </Link>
        </div>
      </div>
    </header>
  );
}
