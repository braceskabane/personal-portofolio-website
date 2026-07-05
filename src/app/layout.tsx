// ================================
// src/app/layout.tsx
// ================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Advanced Portfolio - Daffa'",
  description:
    "Portfolio of Daffa', Junior Full Stack Developer specializing in React, Next.js, TypeScript, and modern web technologies.",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "Full Stack Developer",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Daffa'" }],
  creator: "Daffa'",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dav-portofolio.vercel.app",
    title: "Daffa' - Portfolio",
    description: "Junior Full Stack Developer Portfolio",
    siteName: "Daffa' Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daffa' - Portfolio",
    description: "Junior Full Stack Developer Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className={`${inter.className} bg-white text-black antialiased`}>
        {children}
      </body>
    </html>
  );
}
