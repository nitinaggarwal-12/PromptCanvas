import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeContext";
import { LegalProvider } from "@/components/legal/LegalProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas"]
});

export const metadata: Metadata = {
  title: "PromptCanvas — AI Architecture Diagram & Multi-Agent Topology Studio",
  description: "Generate, render, edit, and version-control production-grade technical architecture diagrams using AI prompts. Powered by Google Gemini and Draw.io.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#0B111E]">
        <a
          href="#main-content"
          className="skip-to-main-link"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LegalProvider>
            <div id="main-content" tabIndex={-1} className="flex-1 flex flex-col outline-none">
              {children}
            </div>
          </LegalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
