import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { Layout } from "@/components";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Notes Flare - Note Sharing App",
  description: "Notes Flare is a note sharing app that allows you to upload and share notes with others.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} min-h-screen antialiased`}>
        <SpeedInsights />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Layout> */}
            {children}
          {/* </Layout> */}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
