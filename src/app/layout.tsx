import type { Metadata } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Display face for editorial headlines.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elyas Noui — Software Engineer",
  description:
    "Software Engineer at Lloyds Banking Group specializing in automation workflows, trading systems integration, and Xceptor platform expertise. Experienced in .NET, C#, SQL Server, Power BI, and Azure.",
  keywords: ["technical specialist", "portfolio", "automation", "xceptor", "lloyds banking group", "dotnet", "csharp", "sql server", "power bi", "azure", "trading systems", "workflow automation"],
  authors: [{ name: "Elyas Noui" }],
  openGraph: {
    title: "Elyas Noui — Software Engineer",
    description:
      "Software Engineer at Lloyds Banking Group specializing in automation workflows, trading systems integration, and Xceptor platform expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables live on <html> so the design tokens in globals.css,
    // which resolve at :root, can reference them.
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
