import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Manrope, Noto_Sans_Arabic } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/site/BackToTop";
import { ChatWidget } from "@/components/site/ChatWidget";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { isRtl, routing } from "@/i18n/routing";
import { getSiteConfig } from "@/lib/cms";
import { site } from "@/lib/site";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Spark Technologies — Enterprise AI for Real-World Operations",
    template: "%s · Spark Technologies",
  },
  description: site.description,
  applicationName: site.name,
  icons: {
    icon: "/assets/brand/spark-mark.png",
    apple: "/assets/brand/spark-mark.png",
  },
  openGraph: {
    title: "Spark Technologies",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_AE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const tc = await getTranslations("HomeContent");
  const rtl = isRtl(locale);
  const lang = locale === "en" ? "en-AE" : locale === "ar" ? "ar" : "az";
  const liveSite = await getSiteConfig();

  return (
    <html
      lang={lang}
      dir={rtl ? "rtl" : "ltr"}
      className={`${manrope.variable} ${instrumentSerif.variable} ${plexMono.variable} ${notoArabic.variable} h-full antialiased`}
    >
      <body
        className={`flex min-h-full flex-col bg-canvas text-ink ${
          rtl ? "font-[family-name:var(--font-arabic)]" : "font-sans"
        }`}
      >
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-on-brand"
          >
            {tc("skipToContent")}
          </a>
          <Header />
          <main id="main" className="flex-1 min-w-0">
            {children}
          </main>
          <Footer />
          <ChatWidget address={liveSite.address} whatsapp={liveSite.whatsapp} />
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
