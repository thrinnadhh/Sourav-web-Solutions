import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sourav Web Solutions — Premium Digital Agency",
  description:
    "We craft high-performance websites, web apps, and digital experiences that drive real business results. Trusted by startups and enterprises worldwide.",
  keywords: "web development, web design, digital agency, Next.js, React, UI/UX, SEO",
  openGraph: {
    title: "Sourav Web Solutions — Premium Digital Agency",
    description:
      "We craft high-performance websites, web apps, and digital experiences that drive real business results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
