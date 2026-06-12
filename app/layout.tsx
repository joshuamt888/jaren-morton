import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jaren — Intuition Out Now",
  description:
    "Intuition is out now. Stream on Spotify, Apple Music, and YouTube.",
  openGraph: {
    title: "Jaren — Intuition Out Now",
    description: "Intuition is out now. Stream it on Spotify.",
    images: ["/images/hero.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bebasNeue.variable} antialiased`}
    >
      <body style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
