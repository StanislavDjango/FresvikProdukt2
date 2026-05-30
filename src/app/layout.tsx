import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fresvik.no"),
  title: {
    default: "Fresvik Produkt",
    template: "%s | Fresvik Produkt",
  },
  description:
    "Fresvik Produkt leverer isolerte panel, portar, dorer, montasje og service til norske prosjekt.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
