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
        url: "/fresvik-logo.svg",
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Isolerte panel, kjøle- og fryseløysingar, montasje og service frå Fresvik Produkt.",
    images: ["/fresvik-logo.svg"],
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
