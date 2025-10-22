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
  title: "Elyas Noui - Full-Stack Developer",
  description: "Full-stack developer specializing in React, Next.js, and modern web technologies. Passionate about creating beautiful, functional applications.",
  keywords: ["developer", "portfolio", "react", "nextjs", "typescript", "web development"],
  authors: [{ name: "Elyas Noui" }],
  openGraph: {
    title: "Elyas Noui - Full-Stack Developer",
    description: "Full-stack developer specializing in React, Next.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
