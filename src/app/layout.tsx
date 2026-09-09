import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientChrome } from "@/components/ClientChrome";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.owner.name} — Full-Stack Developer | AI Applications`,
  description: PORTFOLIO_DATA.owner.summary,
  authors: [{ name: PORTFOLIO_DATA.owner.name }],
  keywords: [
    "Eliyas Mulla",
    "Full Stack Developer",
    "AI-Integrated Web Applications",
    "MERN Stack",
    "Next.js",
    "Gemini AI",
    "Portfolio",
  ],
  openGraph: {
    title: `${PORTFOLIO_DATA.owner.name} — Full-Stack Developer`,
    description: PORTFOLIO_DATA.owner.summary,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-black text-white font-sans selection:bg-blue-500/30 selection:text-white">
        <ClientChrome>{children}</ClientChrome>
      </body>
    </html>
  );
}
