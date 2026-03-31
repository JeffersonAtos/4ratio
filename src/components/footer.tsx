import Link from "next/link";
import type { Dictionary, Lang } from "@/lib/i18n";

export function Footer({ dict, lang }: { dict: Dictionary; lang: Lang }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-1 bg-surface-1">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-t">{dict.nav.logo}</p>
          </div>
          <div className="flex items-center gap-6 text-xs text-t3">
            <a
              href="mailto:feedback@4ratio.com?subject=Feedback%204ratio"
              className="hover:text-t2 transition-colors"
            >
              {dict.footer.feedback}
            </a>
            <Link
              href={`/${lang}/privacy`}
              className="hover:text-t2 transition-colors"
            >
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-border-1 pt-6 flex flex-col items-center gap-2 text-xs text-t3">
          <span>
            {dict.footer.madeWith} {"❤️"} {dict.footer.by}
          </span>
          <span>
            {year} {dict.footer.copy}
          </span>
        </div>
      </div>
    </footer>
  );
}
