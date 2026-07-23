import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteName, siteUrl } from "@/config/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "Fresvik Produkt leverer isolerte panel, portar, dører, montasje og service til norske prosjekt.",
  alternates: {
    canonical: "/",
    languages: {
      "nn-NO": "/",
      en: "/en",
    },
  },
  applicationName: siteName,
  authors: [{ name: "Fresvik Produkt AS" }],
  publisher: "Fresvik Produkt AS",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  openGraph: {
    title: siteName,
    description:
      "Isolerte panel, kjøle- og fryseløysingar, montasje og service frå Fresvik Produkt.",
    url: "/",
    siteName,
    locale: "nn_NO",
    type: "website",
    images: [
      {
        url: "/assets/fresvik/brand/fresvik-logo-original.png",
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Isolerte panel, kjøle- og fryseløysingar, montasje og service frå Fresvik Produkt.",
    images: ["/assets/fresvik/brand/fresvik-logo-original.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nn"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
