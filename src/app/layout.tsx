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
  title: "Elyas Noui - Junior Software Engineer",
  description: "Junior Software Engineer at Lloyds Banking Group specializing in automation workflows, trading systems integration, and Xceptor platform expertise. Experienced in .NET, C#, SQL Server, Power BI, and Azure.",
  keywords: ["technical specialist", "portfolio", "automation", "xceptor", "lloyds banking group", "dotnet", "csharp", "sql server", "power bi", "azure", "trading systems", "workflow automation"],
  authors: [{ name: "Elyas Noui" }],
  openGraph: {
    title: "Elyas Noui - Junior Software Engineer",
    description: "Junior Software Engineer at Lloyds Banking Group specializing in automation workflows, trading systems integration, and Xceptor platform expertise.",
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
