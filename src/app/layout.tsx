import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import "./responsive.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Tarso Hotel — Ho, Volta Region",
  description:
    "Tarso Hotel is one of Ho's pioneering hotels — centrally located, warmly run, and rooted in the spirit of Ewe hospitality on the Amedzofe Road, Volta Region, Ghana.",
  keywords: "Tarso Hotel, Ho Ghana, Volta Region hotel, hotels in Ho, Ghana accommodation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={inter.className}>{children}
        <Analytics />
      </body>
    </html>
  );
}