import { NextRequest, NextResponse } from "next/server";
import { LANGUAGES, type Lang } from "@/lib/i18n";

function getPreferredLang(request: NextRequest): Lang {
  const acceptLang = request.headers.get("accept-language") || "";

  // Parse Accept-Language header properly: "pt-BR,pt;q=0.9,en-US,en;q=0.8"
  const segments = acceptLang.split(",").map((s) => {
    const [tag, q] = s.trim().split(";q=");
    return { lang: tag.trim().toLowerCase(), quality: q ? parseFloat(q) : 1.0 };
  });

  // Sort by quality descending
  segments.sort((a, b) => b.quality - a.quality);

  // Match against supported languages by prefix
  for (const seg of segments) {
    const prefix = seg.lang.split("-")[0]; // "pt-BR" → "pt"
    const match = LANGUAGES.find((l) => l === prefix);
    if (match) return match;
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already starts with a valid lang
  const hasLang = LANGUAGES.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (hasLang) return NextResponse.next();

  // Skip static files and api routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files like favicon.ico
  ) {
    return NextResponse.next();
  }

  // Redirect to detected language
  const lang = getPreferredLang(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
