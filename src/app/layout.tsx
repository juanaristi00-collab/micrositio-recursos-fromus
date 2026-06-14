import type { Metadata } from "next";
import {
  Dela_Gothic_One,
  Inter,
  JetBrains_Mono,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";

const dela = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Recursos Fromus — Guías para contratar con el Estado",
    template: "%s · Recursos Fromus",
  },
  description:
    "Guías gratuitas para dueños de empresa: cómo construir tu RUP y el paso a paso para licitar con el Estado en Colombia. Por Fromus.",
  openGraph: {
    title: "Recursos Fromus — Guías para contratar con el Estado",
    description:
      "Cómo construir tu RUP y el paso a paso para licitar con el Estado en Colombia.",
    type: "website",
    locale: "es_CO",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${dela.variable} ${inter.variable} ${jetbrains.variable} ${caveat.variable} flex min-h-screen flex-col`}
      >
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
