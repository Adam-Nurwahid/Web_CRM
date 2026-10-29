import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";
import { DataProvider } from "@/components/providers/DataProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Juragan Aqiqah — CRM & Operations",
  description:
    "CRM modern untuk mengelola customer, pesanan, campaign, dan operasional bisnis aqiqah.",
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geist.variable} ${instrumentSerif.variable}`}
    >
      <body className={`${geist.className} grain`}>
        <DataProvider>
          <AppShell>{children}</AppShell>
        </DataProvider>
      </body>
    </html>
  );
}
